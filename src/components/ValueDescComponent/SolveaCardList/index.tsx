import { Col, Row } from 'antd';
import cx from 'classnames';
import { SolveaCardItem } from '../SolveaCard';
import SolveaCardWrapper from '../SolveaCardWrapper';
import styles from './index.module.scss';

interface Props {
  cardList: SolveaCardItem[];
  className?: string;
  noGap?: boolean; // 当设置为true时，移除gap并应用边框重叠修复
  anis?: any;
  numberOfRows?: number;
}

export default function SolveaCardList(props: Props) {
  const { cardList, className, noGap = false, anis, numberOfRows = 3 } = props;
  // 确保 colSpan 是有效的整数，并且是24的因数
  const colSpan = numberOfRows > 0 ? Math.floor(24 / numberOfRows) : 8;

  return (
    <div className={cx(styles.cardList, { [styles.noGap]: noGap }, className)}>
      <Row gutter={[8, 8]}>
        {cardList.map((item: SolveaCardItem, index: number) => (
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
              cardItemProps={{
                onMouseEnter: () => {
                  if (anis && anis[index]) {
                    anis[index].play();
                  }
                },
                onMouseLeave: () => {
                  if (anis && anis[index]) {
                    anis[index].stop();
                  }
                },
              }}
              key={index}
            >
              {item.icon && item.icon}
              <div
                className={styles.cardItemTitle}
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <div
                className={styles.cardItemContent}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </SolveaCardWrapper>
          </Col>
        ))}
      </Row>
    </div>
  );
}
