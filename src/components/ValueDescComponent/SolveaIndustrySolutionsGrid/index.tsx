import { Col, Row } from 'antd';
import styles from './index.module.scss';

interface SolveaIndustrySolutionsGridProps {
  title: string;
  cardList: Array<{
    title: string;
    description: string;
    img: string;
    href: string;
  }>;
}

export default function SolveaIndustrySolutionsGrid(props: SolveaIndustrySolutionsGridProps) {
  const { title, cardList } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.cardList}>
        <Row gutter={[17, 17]}>
          {cardList.map((card, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12} xl={8} style={{ display: 'flex' }}>
              <a href={card.href} key={index} className={styles.cardItem}>
                <img
                  src={card.img}
                  alt={card.title}
                  className={styles.cardImg}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardDescription}>{card.description}</div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
