import React from 'react';
import styles from './index.module.scss';
import SvgCheck from 'components/Icons/Check';
import GoButton from 'components/GoButton';
import i18n from '@/i18n';

interface Props {
  title?: string;
  subTitle?: string;
  data?: UserCaseItem[];
}

export default function StoriesCards(props: Props) {
  const { title, subTitle, data } = props;
  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subTitle}>{subTitle}</div>
        </div>
        <div className={styles.main}>
          {data?.map((v, index) => {
            return (
              <div className={styles.cardItem} key={index}>
                <div className={styles.introImgBox}>
                  <img
                    src={v.productImage}
                    alt={v.title}
                    className={styles.introImg}
                  />
                </div>
                <div className={styles.cardMain}>
                  <div className={styles.brandIconBox}>
                    <img
                      src={v.brandImage}
                      alt={v.title}
                      className={styles.brandIconUrl}
                    />
                  </div>
                  <div className={styles.cardDesc}>
                    <div className={styles.cardDescText}>{v.title}</div>
                  </div>
                  <div className={styles.cardTips}>
                    {v.indicator?.map((sv, svIndex) => {
                      return (
                        <div className={styles.tipItem} key={svIndex}>
                          <SvgCheck className={styles.tipCheck} />
                          <div className={styles.tipContent}>
                            <div className={styles.tipPreText}>{sv?.value}</div>
                            <div className={styles.tipText}>{sv?.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.cardFooter}>
                    <GoButton url={v.moreUrl}>
                      {i18n('layout.Common_LearnMore')}
                    </GoButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
