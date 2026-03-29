import { Col, Row } from 'antd';
import NoData from '../NoData';
import PartLabel from '../PartLabel';
import SolveaCardWrapper from '../SolveaCardWrapper';
import styles from './index.module.scss';

export interface SolveaCustomerTestimonialCardItem {
  topContent: string;
  titleImg: string;
  content: string;
  description: string;
}

interface Props {
  partLabel: string;
  title: string;
  cardList: SolveaCustomerTestimonialCardItem[];
  numberOfRows?: number;
}
export default function SolveaCustomerTestimonial(props: Props) {
  const { partLabel, title, cardList, numberOfRows = 2 } = props;
  // 确保 colSpan 是有效的整数，并且是24的因数
  const colSpan = numberOfRows > 0 ? Math.floor(24 / numberOfRows) : 12;

  if (!cardList || cardList.length === 0) {
    return <NoData />;
  }

  return (
    <div className={styles.container}>
      <PartLabel partLabel={partLabel} type="themeOne" />
      <div className={styles.title}>{title}</div>
      <div className={styles.cardList}>
        <Row style={{ display: 'flex', alignItems: 'stretch' }} gutter={[8, 8]}>
          {cardList.map((item, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={colSpan}
              lg={colSpan}
              xl={colSpan}
              style={{ display: 'flex' }}
            >
              <SolveaCardWrapper type="textCard" topContent={item.topContent}>
                <img
                  src={item.titleImg}
                  className={styles.cardItemTitleImg}
                  alt=""
                  width={120}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.cardItemContent}>{item.content}</div>
                <div className={styles.cardItemDescription}>{item.description}</div>
              </SolveaCardWrapper>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
