import React from 'react';
import styles from './index.module.scss';
import { CheckGreen } from 'components/Icons';
import SvgCheckPure from 'components/Icons/CheckPure';
import cx from 'classnames';

interface PointsIntroDescItem {
  type: 'point' | 'text' | 'check';
  text: string;
  subList: PointsIntroDescItem[];
}

interface Item {
  title: string;
  desc: string | PointsIntroDescItem[];
}

interface Props {
  title: string;
  data: Item[];
  showCheck?: boolean;
  aos?: string;
}

export default function PointsIntro(props: Props) {
  const { title, data, showCheck, aos } = props;
  const renderDescItem = (v, isSub?) => {
    let item: React.ReactNode = null;
    if (v?.type === 'point') {
      item = (
        <div className={cx(styles.point, isSub && styles.isSub)}>{v?.text}</div>
      );
    } else if (v?.type === 'check') {
      item = (
        <div className={styles.check}>
          <SvgCheckPure className={styles.checkIcon} />
          {v?.text}
        </div>
      );
    } else if (v?.type === 'text') {
      item = v?.text;
    }
    return item;
  };

  const renderDesc = (vData: Item['desc']) => {
    let rData: React.ReactNode = null;
    if (typeof vData === 'string') {
      rData = vData;
    } else if (Array.isArray(vData)) {
      rData = (
        <div className={styles.descBox}>
          {vData?.map((v) => {
            let item = renderDescItem(v);

            if (typeof v !== 'string' && v?.subList?.length > 0) {
              item = (
                <div className={styles.subList}>
                  <div>{item}</div>
                  <div className={styles.sub}>
                    {v?.subList?.map((sv) => {
                      return renderDescItem(sv, true);
                    })}
                  </div>
                </div>
              );
            }
            return item;
          })}
        </div>
      );
    }

    return rData;
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.title}>{title}</div>
        <div className={styles.list}>
          {data?.map((sl, slIndex) => {
            return (
              <div
                key={slIndex}
                className={styles.itemColumn}
                data-aos={aos ?? 'fade-right'}
              >
                <div className={styles.index}>
                  {slIndex + 1}
                  {showCheck && <CheckGreen className={styles.checkIcon} />}
                </div>
                <div className={styles.columns}>
                  <div className={styles.item}>
                    <div className={styles.itemTitle}>{sl.title}</div>
                    <div className={styles.itemDesc}>{renderDesc(sl.desc)}</div>
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
