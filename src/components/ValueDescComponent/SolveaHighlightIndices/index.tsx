import { Col, Row } from 'antd';
import NoData from '../NoData';
import PartLabel from '../PartLabel';
import SolveaCardWrapper from '../SolveaCardWrapper';
import styles from './index.module.scss';

export interface SolveaHighlightIndicesCardItem {
  topContent: string;
  data: string;
  description: string;
}

interface Props {
  partLabel: string;
  title: string;
  cardList: SolveaHighlightIndicesCardItem[];
  numberOfRows?: number;
}
export default function SolveaHighlightIndices(props: Props) {
  const { partLabel, title, cardList, numberOfRows = 3 } = props;
  // 确保 colSpan 是有效的整数，并且是24的因数
  const colSpan = numberOfRows > 0 ? Math.floor(24 / numberOfRows) : 8;

  if (!cardList || cardList.length === 0) {
    return <NoData />;
  }

  return (
    <div className={styles.container}>
      <PartLabel partLabel={partLabel} type="themeOne" />
      <div className={styles.title}>{title}</div>
      <div className={styles.cardList}>
        <Row style={{ display: 'flex', alignItems: 'stretch', width: '100%' }} gutter={[8, 8]}>
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
                <div className={styles.cardItemData}>{item.data}</div>
                <div className={styles.cardItemDescription}>{item.description}</div>
              </SolveaCardWrapper>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
