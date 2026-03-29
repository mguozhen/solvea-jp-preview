'use client';
// import Footer from 'components/Footer';
// import Header from 'components/Header';
// import Render from 'components/ValueDescComponent';
import { useRemAdapter } from '@/hooks/useRemAdapter';
import cx from 'classnames';
import Render from 'components/ValueDescComponent';
import Head from 'next/head';
import React, { useMemo } from 'react';
import { RecoilRoot } from 'recoil';
import styles from './index.module.scss';

interface LandingPageProps {
  data?: any;
  articleList?: any;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonical?: string;
  hideLogin?: boolean;
  chromeHref?: string;
  padding?: string;
  contentClass?: string;
  transparentTitle?: boolean;
  renderWrapper?: (_comp: React.ReactNode, _schema: any, _index: number) => React.ReactNode;
  isUaMobile?: boolean; // 根据header里ua判断是否为移动设备
  backgroundColor?: string;
  theme?: 'dark' | 'light';
  styleConfig?: {
    headerStyleConfig?: any;
    footerStyleConfig?: any;
  };
  headerSticky?: boolean;
}

export default function LandingPage(props: LandingPageProps) {
  const {
    data,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonical,
    padding,
    contentClass,
    renderWrapper,
    isUaMobile,
    backgroundColor,
  } = props;

  // 使用字体缩放适配器 - 多断点配置
  // 手机端（≤768px）：1rem = 8px，4.25rem = 34px
  // 平板端（768px-1720px）：1rem = 16px，4.25rem = 68px
  // 大屏幕（≥1720px）：1rem = 18px，4.25rem = 76.5px
  useRemAdapter({
    mobile: { breakpoint: 768, scale: 0.5 }, // 8px ÷ 16px = 0.5
    tablet: { breakpoint: 1720, scale: 1.0 }, // 16px ÷ 16px = 1.0
    desktop: { scale: 1.125 }, // 18px ÷ 16px = 1.125
  });

  // const { locale } = useI18n();
  const headerProps = useMemo(() => {
    return data?.subComponents?.find((a) => a.isHeader);
  }, [data]);

  const noHeaderProps = useMemo(() => {
    const { type, props, uuid, theme } = data || {};
    return {
      type,
      props,
      uuid,
      theme,
      subComponents: data?.subComponents?.filter((d) => {
        return !d.isHeader;
      }),
    };
  }, [data]);

  // 为根路径或者各种语言路径的根路径，使用正则判断
  const isHome = true;

  return (
    <RecoilRoot>
      <div
        className={cx(styles.page)}
        style={backgroundColor ? { background: backgroundColor } : {}}
      >
        <Head>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} key="desc" />
          {canonical && <link rel="canonical" href={canonical} />}
          {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        </Head>
        {headerProps && (
          <div className={styles.start}>
            <Render
              {...headerProps}
              isHeader
              renderWrapper={renderWrapper}
              isUaMobile={isUaMobile}
            />
          </div>
        )}
        <div
          className={cx(styles.content, contentClass, styles.sideFade, {
            [styles.home]: isHome,
          })}
          style={padding ? { padding } : undefined}
        >
          <Render {...noHeaderProps} renderWrapper={renderWrapper} isUaMobile={isUaMobile} />
        </div>
      </div>
    </RecoilRoot>
  );
}
