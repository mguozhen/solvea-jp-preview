'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import i18n, { getLang } from '@/i18n';
import { getLivechatConfig } from 'util/services';
import { QuestionTip } from 'components/Icons';
import cx from 'classnames';

interface Props {
  livechatData: any;
  painPoints: any;
}

const LivechatDemo = (props: Props) => {
  const { livechatData } = props;
  const [livechatConfig, setLivechatConfig] = useState<any>();
  const [showQuestions, setShowQuestions] = useState(true);
  const ref = useRef<HTMLIFrameElement>(null);
  const sendExample = (question: string) => {
    setShowQuestions(false);
    ref.current?.contentWindow?.postMessage(
      JSON.stringify({
        type: 'sendMessage',
        data: question,
      }),
      '*',
    );
  };
  const onLoad = () => {
    ref?.current?.contentWindow?.postMessage(
      JSON.stringify({ type: 'ready' }),
      '*',
    );
  };

  useEffect(() => {
    try {
      const url = new URL(livechatData?.livechatUrl || '');
      const id = new URLSearchParams(url?.hash?.split('?')?.[1])?.get('id');
      if (id) {
        getLivechatConfig(+id).then((res) => {
          setLivechatConfig(res);
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (livechatConfig && ref.current) {
      ref.current?.contentWindow?.postMessage(
        JSON.stringify({
          type: 'updateConfig',
          data: livechatConfig,
        }),
        '*',
      );
    }
  }, [livechatConfig, ref.current]);

  return (
    <div className={styles.block}>
      <div className={styles.container}>
        <div className={styles.title}>{i18n('layout.Solvea_Action')}</div>
        <div className={styles.subTitle}>
          {i18n('layout.Solvea_Action_Support_content')}
        </div>
        <div className={styles.content}>
          <div
            className={cx(
              styles.livechatBox,
              !showQuestions && styles.livechatBoxMax,
            )}
          >
            <iframe
              className={styles.livechatFrame}
              // style={audioStyle}
              src={`${
                livechatData?.livechatUrl
              }&noBrand=true&lang=${getLang()}`}
              scrolling="no"
              frameBorder="no"
              allowFullScreen
              loading="lazy"
              ref={ref}
              onLoad={onLoad}
            ></iframe>
          </div>
          {showQuestions && (
            <div className={styles.infoBox}>
              <div className={styles.recommendBox}>
                <div className={styles.recommendDesc}>
                  {i18n('layout.Click_Question_Tip')}
                </div>
                <div className={styles.recommendList}>
                  {livechatData?.recommendQuestions?.map((item: any) => {
                    return (
                      <div
                        className={styles.recommendItem}
                        key={item}
                        onClick={() => sendExample(i18n(`layout.${item}`))}
                      >
                        <div className={styles.recommendTitle}>
                          {i18n(`layout.${item}`)}
                        </div>
                        <QuestionTip className={styles.tipIcon} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivechatDemo;
