import { Col, Row } from 'antd';
import styles from './index.module.scss';
interface SolveaSolutionsOverviewProps {
  title: string;
  description: string;
  cardList: Array<{
    title: string;
    description: string;
    img: string;
  }>;
}

export default function SolveaSolutionsOverview(props: SolveaSolutionsOverviewProps) {
  const { title, description, cardList } = props;

  console.log(cardList);

  return (
    <div className={styles.solveaSolutionsOverview}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.cardList}>
        <Row gutter={[40, 40]}>
          {cardList.map((card, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
              <div key={index} className={styles.cardItem}>
                <img
                  src={card.img}
                  alt={card.title}
                  className={styles.cardImage}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>{card.description}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
