import { Button } from 'pages/mod/Button';
import { Line } from 'pages/mod/Line';
import PartLabel from '../PartLabel';
import SolveaCardList from '../SolveaCardList';
import styles from './index.module.scss';

interface Props {
  partLabel: string;
  title: string;
  numberOfRows?: number;
  cardList: { img: string; title: string; content: string }[];
  description: string;
  href: string;
  text: string;
}
export default function SolveaBlock(props: Props) {
  const { partLabel, title, cardList, numberOfRows = 3, description, href, text } = props;

  const cardListWithExtraContent = cardList.map((item) => ({
    ...item,
    icon: (
      <img
        src={item.img}
        alt={item.title}
        className={styles.img}
        loading="lazy"
        decoding="async"
      />
    ),
  }));

  return (
    <div className={styles.container}>
      {/* 标题容器 */}
      <div className={styles.titleContainer}>
        <PartLabel partLabel={partLabel} className={styles.partLabel} />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.cardListContainer}>
        {/* 卡片列表 */}
        <SolveaCardList
          numberOfRows={numberOfRows}
          cardList={cardListWithExtraContent}
          className={styles.cardList}
        />
      </div>
      {description && href && text && (
        <div className={styles.footerContainer}>
          {/* 描述 */}
          <Line />
          <div className={styles.description}>{description}</div>
          <Line />

          {/* 按钮 */}
          <a href={href} target="_blank" className={styles.buttonLink}>
            <Button className={styles.button}>{text}</Button>
          </a>
        </div>
      )}
    </div>
  );
}
