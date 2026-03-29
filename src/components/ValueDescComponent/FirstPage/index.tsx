'use client';
import useCnTallyListener from '@/hooks/useCnTallyListener';
import i18n from '@/i18n';
import cx from 'classnames';
import EnForm from 'components/EnForm';
import SubmitedForm from 'components/SubmitedForm';
import { isNil } from 'lodash';
import { useEffect, useMemo } from 'react';
import { isSubmittedForm } from 'util/common';
import styles from './index.module.scss';

interface Props {
  className?: string;
  title: string;
  description1: string;
  description2: string;
  isCN: boolean;
  type?: 'tally' | 'hubspot';
  formId?: string;
  h1?: boolean;
  anchorId?: string;
}

export default function FirstPage(props: Props) {
  let {
    className,
    title,
    description1,
    description2,
    isCN = true,
    h1,
    formId,
    type,
    anchorId,
  } = props;
  if (isNil(formId)) {
    formId = isCN ? 'w8KoQo' : '00221155-2faa-43b2-9bb9-ca7625c50cee';
  }
  if (isNil(type)) {
    type = isCN ? 'tally' : 'hubspot';
  }
  useCnTallyListener();

  useEffect(() => {
    const src = 'https://tally.so/widgets/embed.js';

    if (!document.querySelector('script[src="' + src + '"]')) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }
  }, []);

  const hasSubmit = useMemo(() => isSubmittedForm(), []);
  return (
    <div
      id={anchorId || ''}
      className={cx(styles.container, hasSubmit && styles.hasSubmit, className)}
    >
      <div className={cx(styles.block, styles.flex, styles.overBlock)}>
        <img
          src="https://cdn.shulex-voc.com/shulex/upload/2025-08-08/b7315cec-70b1-4646-bee3-6838b5924c55.svg"
          className={styles.mobileBackground}
          alt="background"
        />

        <div className={styles.layoutMain}>
          <div className={styles.left}>
            {h1 && <div className={styles.title}>{title ?? i18n('layout.Home_Title1')}</div>}
            {!h1 && <h2 className={styles.title}>{title ?? i18n('layout.Home_Title1')}</h2>}
            <div className={styles.subTitle} style={{ marginBottom: 32 }}>
              {description1 ?? i18n('layout.Home_Title2')}
            </div>
            <div
              className={styles.subTitle}
              dangerouslySetInnerHTML={{
                __html: description2?.replace(/\n/g, '<br/>'),
              }}
            ></div>
          </div>
          <div className={styles.right}>
            {type == 'tally' ? (
              <>
                {hasSubmit ? (
                  <div className={styles.formIframe}>
                    <SubmitedForm noWrap />
                  </div>
                ) : (
                  <iframe
                    src={`https://tally.so/embed/${formId}?transparentBackground=1&dynamicHeight=1&source=officialwebsite`}
                    className={styles.formIframe}
                    style={{
                      background: '#fff',
                      width: '650px',
                      borderRadius: '32px',
                      marginBottom: '100px',
                      border: 'none',
                      display: 'block',
                    }}
                    frameBorder={'none'}
                    marginHeight={0}
                    marginWidth={0}
                    scrolling="no"
                  />
                )}
              </>
            ) : (
              <div className={cx(styles.formIframe, styles.enFormIframe)}>
                <EnForm formId={formId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
