'use client';
import i18n from '@/i18n';
import { Spin } from 'antd';
import SolveaFormSubmited from 'components/SolveaFormSubmited';
import { useEffect, useRef, useState } from 'react';
import { getUrlQuery } from 'shulex-util';
import { logSubmittedForm } from 'util/common';
import { submitFormToGTM } from 'util/document';

interface Props {
  noSubmitGTM?: boolean;
  formId?: string;
  formType?: 'download' | 'default';
  reportLink?: string;
}

export default function HubSpotForm(props: Props) {
  const {
    noSubmitGTM,
    formId = '00221155-2faa-43b2-9bb9-ca7625c50cee',
    formType = 'default',
    reportLink,
  } = props;
  const formContainerRef = useRef<HTMLDivElement>(null); // 获取当前 div 的引用
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    // 1. 检查是否已加载过脚本（避免重复加载）
    if (window.hbspt) {
      createForm();
      return;
    }

    // 2. 动态加载 HubSpot 脚本
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.charset = 'utf-8';
    script.onload = createForm; // 加载完成后初始化表单
    document.body.appendChild(script);

    function createForm() {
      if (!window.hbspt || !formContainerRef.current) return;

      // 3. 将表单渲染到当前 div 内
      window.hbspt.forms.create({
        portalId: '23789577',
        formId,
        region: 'na1',
        target: `#${formContainerRef.current.id}`, // 关键点：指定渲染目标
        onFormReady: (form) => {
          const websiteSourceField = form.querySelector(
            '[name="form_website_source"]',
          );
          if (websiteSourceField) {
            if (getUrlQuery('utm_medium') == 'paid') {
              websiteSourceField.value = 'Ads';
            } else {
              websiteSourceField.value = 'Solvea Website';
            }
          }
          const websiteIsFacebook = form.querySelector('[name="channel_ads"]');
          const utmSource = getUrlQuery('utm_source');
          if (
            websiteIsFacebook &&
            ['facebook', 'twitter', 'linkedin', 'google'].includes(
              utmSource as string,
            )
          ) {
            websiteSourceField.channel_ads = utmSource;
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        },
      });
    }

    return () => {
      // 清理脚本（可选）
      document.body.querySelector('script[src*="hsforms.net"]')?.remove();
    };
  }, []);

  useEffect(() => {
    // 监听跨窗口消息事件
    const handleMessage = (event) => {
      try {
        // 海外表单
        if (
          event.data?.type === 'hsFormCallback' &&
          event.data?.eventName === 'onFormSubmitted'
        ) {
          submitFormToGTM?.(event.data?.id);
          logSubmittedForm();
          setHasSubmit(true);
          if (formType === 'download' && reportLink) {
            window.open(reportLink, '_blank');
          }
        }
      } catch (error) {
        console.log('hyx error', error);
      }
    };

    if (!noSubmitGTM) {
      window.addEventListener('message', handleMessage);
    }

    return () => {
      if (!noSubmitGTM) {
        window.removeEventListener('message', handleMessage);
      }
    };
  }, []);

  if (hasSubmit && formType === 'default') {
    return <SolveaFormSubmited noWrap />;
  }

  if (formType === 'download' && hasSubmit) {
    return (
      <SolveaFormSubmited
        noWrap
        reportLink={reportLink}
        title={i18n('solvea.Download_report_desc')}
        buttonText={i18n('solvea.Download_report_button')}
      />
    );
  }

  // 4. 确保 div 有唯一 ID（HubSpot 需要）
  return (
    <Spin spinning={isLoading}>
      <div
        id="hubspot-form-container"
        ref={formContainerRef}
        style={{
          height: isLoading ? 500 : 'auto',
          overflow: 'hidden',
          opacity: isLoading ? 0 : 1,
        }}
      />
    </Spin>
  );
}
