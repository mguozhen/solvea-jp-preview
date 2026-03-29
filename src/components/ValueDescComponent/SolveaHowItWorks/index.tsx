import { Col, Row } from 'antd';
import SolveaButton from '../SolveaButton';
import styles from './index.module.scss';
interface SolveaHowItWorksProps {
  title: string;
  description: string;
  cardList: Array<{
    index: number;
    title: string;
    description: string;
    img: string;
  }>;
  button: { text: string; href: string };
}

export default function SolveaHowItWorks(props: SolveaHowItWorksProps) {
  const { title, description, cardList, button } = props;

  return (
    <div className={styles.solveaSolutionsOverview}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.cardList}>
        <Row gutter={[15, 15]}>
          {cardList.map((card, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} style={{ display: 'flex' }}>
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardIndex}>{'0' + (index + 1)}</div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>{card.description}</div>
                <img
                  src={card.img}
                  alt={card.title}
                  className={styles.cardImage}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
      {/* 按钮 */}
      <SolveaButton className={styles.buttonLink} button={button} />
    </div>
  );
}
