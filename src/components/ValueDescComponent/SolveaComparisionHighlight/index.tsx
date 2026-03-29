import { Col, Row } from 'antd';
import cx from 'classnames';
import Lottie, { AnimationItem } from 'lottie-web';
import StatsContainer from 'pages/mod/Redefines/StatsContainer';
import React, { useEffect, useRef } from 'react';
import NoData from '../NoData';
import PartLabel from '../PartLabel';
import SolveaCardWrapper from '../SolveaCardWrapper';
import styles from './index.module.scss';

export interface SolveaComparisionHighlightCardItem {
  topContent: string;
  content: string;
  liContent: string[];
  extraContent: string;
  dynamicData?: string;
  icon?: React.ReactNode;
}

interface Props {
  partLabel: string;
  title: string;
  cardList: SolveaComparisionHighlightCardItem[];
  numberOfRows?: number;
}
export default function SolveaComparisionHighlight(props: Props) {
  const { partLabel, title, cardList, numberOfRows = 3 } = props;
  // 确保 colSpan 是有效的整数，并且是24的因数
  const colSpan = numberOfRows > 0 ? Math.floor(24 / numberOfRows) : 8;

  const anis = useRef<(AnimationItem | null)[]>([]);

  const iconList = [
    'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-715_Icons_animation-pink.json',
    'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-715_Icons_animation-blue.json',
    'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-715_Icons_animation-green.json',
  ];

  // 清理动画
  useEffect(() => {
    return () => {
      anis.current.forEach((ins) => ins && ins.destroy());
    };
  }, []);

  const cardListWithExtraContent = (mapCardList: SolveaComparisionHighlightCardItem[]) =>
    mapCardList.map((item, index: number) => ({
      ...item,
      icon: (
        <div
          ref={(el) => {
            if (el && !anis.current[index]) {
              // 当 DOM 元素可用时，立即创建动画
              anis.current[index] = Lottie.loadAnimation({
                loop: false,
                autoplay: false,
                container: el,
                path: iconList[index % 3],
              });
            }
          }}
          className={cx(styles.allowIcon, styles.themeTwo)}
        />
      ),
    }));

  if (!cardList || cardList.length === 0) {
    return <NoData />;
  }

  return (
    <div className={styles.container}>
      <PartLabel partLabel={partLabel} type="themeOne" />
      <div className={styles.title}>{title}</div>
      <div className={styles.cardList}>
        <Row gutter={[8, 8]}>
          {cardListWithExtraContent(cardList).map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={colSpan}
              lg={colSpan}
              xl={colSpan}
              style={{ display: 'flex' }}
            >
              <SolveaCardWrapper
                type="textCard"
                topContent={item.topContent}
                cardItemProps={{
                  onMouseEnter: () => {
                    if (anis?.current?.[index]) {
                      const animation = anis.current[index];
                      animation?.play();
                    }
                  },
                  onMouseLeave: () => {
                    if (anis?.current?.[index]) {
                      const animation = anis.current[index];
                      animation?.stop();
                    }
                  },
                }}
              >
                {item.icon && item.icon}
                <div
                  className={styles.cardItemContent}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                {item.liContent && item.liContent.length > 0 && (
                  <ul
                    className={cx({
                      [styles.liContent]: true,
                      [styles.pinkSquare]: index % 3 === 0,
                      [styles.purpleSquare]: index % 3 === 1,
                      [styles.greenSquare]: index % 3 === 2,
                    })}
                  >
                    {item.liContent.map((listItem, listIndex) => (
                      <li
                        key={listIndex}
                        className={cx({
                          [styles.otherLi]: listIndex % 2 !== 0,
                        })}
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )}

                {item.dynamicData ? (
                  <StatsContainer fromSolveaComparisionHighlight />
                ) : (
                  <img src={item.extraContent} className={styles.extraContentImg} />
                )}
              </SolveaCardWrapper>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
