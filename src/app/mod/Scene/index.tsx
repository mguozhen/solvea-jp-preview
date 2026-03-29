import React from 'react';
import styles from './index.module.scss';
import i18n from '@/i18n';
import { SceneList2 } from './data';
import cx from 'classnames';
import { Arrow } from '../svgs/icons';
import { Call3, Chat5 } from 'components/Icons';
import TextAnimation from 'components/TextAnimation';

export const Scene = () => {
  const renderItem = (item: any) => {
    return (
      <a
        className={styles.sceneItem}
        key={item.title}
        href={`/agent?id=${item.agentId}&type=voice`}
      >
        <div className={styles.sceneItemImgBox}>
          <img src={item.img} alt={i18n(`solvea.${item.title}`)} />
        </div>
        <div className={styles.sceneItemContent}>
          <h4 className={styles.sceneItemTitle}>
            <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
              {i18n(`solvea.${item.title}`)}
            </TextAnimation>
          </h4>
          <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
            <div className={styles.desc}>{i18n(`solvea.${item.desc}`)}</div>
          </TextAnimation>
          <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
            <div className={styles.sceneItemBtnWrap}>
              <a
                href={`/agent?id=${item.agentId}&type=voice`}
                className={styles.sceneItemBtnLink}
              >
                <div
                  className={cx(
                    styles.sceneItemBtnContent,
                    styles.callItemBtnContent,
                  )}
                >
                  <div className={styles.sceneItemBtn}>
                    <Call3 style={{ width: 0 }} className={styles.btnIcon} />
                    {i18n('solvea.Solutions_Call')}
                  </div>
                  <Arrow className={`${styles.arrow} btn-arrow`} />
                </div>
              </a>
              <a
                href={`/agent?id=${item.agentId}&type=chat`}
                className={styles.sceneItemBtnLink}
              >
                <div
                  className={cx(
                    styles.sceneItemBtnContent,
                    styles.chatItemBtnContent,
                  )}
                >
                  <div className={styles.sceneItemBtn}>
                    <Chat5 style={{ width: 0 }} className={styles.btnIcon} />
                    {i18n('solvea.Solutions_Chat')}
                  </div>
                  <Arrow className={`${styles.arrow} btn-arrow`} />
                </div>
              </a>
            </div>
          </TextAnimation>
        </div>
        {/* <p>{item.desc}</p> */}
      </a>
    );
  };
  return (
    <div className={styles.container} id={'scene'}>
      <div className={styles.header}>
        {/* <div className={styles.realTimeData}>
          <div className={styles.dot}></div>
          <span>{i18n('solvea.Home_footer_resources1')}</span>
        </div> */}
        <div className={styles.title}>
          <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
            {i18n('solvea.Home_Showcase_Bigtitle')}
          </TextAnimation>
        </div>
        <h3>
          <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
            {i18n('solvea.Home_Showcase_Scenetitle')}
          </TextAnimation>
        </h3>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sceneList}>
          {SceneList2.map((item) => {
            return renderItem(item);
          })}
        </div>
      </div>
    </div>
  );
};
