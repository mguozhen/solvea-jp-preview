import SolveaButton from '../SolveaButton';
import styles from './index.module.scss';
interface SolveaInsightsViewProps {
  title: string;
  description: string;
  cardList?: Array<{
    title: string;
    content: Array<string>;
  }>;
  text?: string;
  button: {
    text: string;
    href: string;
  };
  img: string;
}

export default function SolveaInsightsView(props: SolveaInsightsViewProps) {
  const { title, description, cardList, text, button, img } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.content}>
        <img
          src={img}
          alt={title}
          className={styles.img}
          loading="lazy"
          decoding="async"
        />
        {cardList && cardList[0]?.title && (
          <div className={styles.cardList}>
            {cardList.map((card, index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardContent}>
                  {card.content?.map((item, index) => (
                    <div key={index} className={styles.cardDescriptionItem}>
                      <img
                        src="https://cdn.shulex-voc.com/shulex/upload/2026-01-15/3b83c471-652d-449d-b445-55dd1f541cf9.png"
                        alt="icon"
                        className={styles.cardDescriptionItemIcon}
                      />{' '}
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {text && !cardList?.[0]?.title && <div className={styles.cardDescriptionText}>{text}</div>}
      </div>
      <SolveaButton className={styles.buttonLink} button={button} />
    </div>
  );
}
