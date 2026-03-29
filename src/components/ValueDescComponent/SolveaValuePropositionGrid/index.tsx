import SolveaButton from '../SolveaButton';
import styles from './index.module.scss';

interface SolveaValuePropositionGridProps {
  title: string;
  description: string;
  cardList: Array<{
    title: string;
    description: string;
  }>;
  button: {
    text: string;
    href: string;
  };
}

export default function SolveaValuePropositionGrid(props: SolveaValuePropositionGridProps) {
  const { title, description, cardList, button } = props;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.cardList}>
        {cardList.map((card, index) => (
          <div key={index} className={styles.cardItem}>
            <div className={styles.cardTitle}>{card.title}</div>
            <div className={styles.cardDescription}>{card.description}</div>
          </div>
        ))}
      </div>
      <SolveaButton className={styles.buttonLink} button={button} btnType="whiteBtn" />
    </div>
  );
}
