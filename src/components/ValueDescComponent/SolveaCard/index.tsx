import Lottie, { AnimationItem } from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import NoData from '../NoData';
import PartLabel from '../PartLabel';
import SolveaCardList from '../SolveaCardList';
import styles from './index.module.scss';

export interface SolveaCardItem {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

interface Props {
  partLabel: string;
  title: string;
  cardList: SolveaCardItem[];
  numberOfRows?: number;
}
export default function SolveaCard(props: Props) {
  const { partLabel, title, cardList, numberOfRows = 3 } = props;
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

  const cardListWithExtraContent = (mapCardList: SolveaCardItem[]) =>
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
          className={styles.allowIcon}
        />
      ),
    }));

  if (!cardList || cardList.length === 0) {
    return <NoData />;
  }

  return (
    <div className={styles.container}>
      {/* 标题容器 */}
      <div className={styles.titleContainer}>
        <PartLabel partLabel={partLabel} />
        <div className={styles.title}>{title}</div>
      </div>
      {/* 卡片列表 */}
      <SolveaCardList
        numberOfRows={numberOfRows}
        cardList={cardListWithExtraContent(cardList)}
        className={styles.cardList}
        anis={anis.current}
      />
    </div>
  );
}
