import { Col, Row } from 'antd';
import LabelMod from 'components/ValueDescComponent/LabelMod';
import WithAnimation from 'components/WithAnimation';
import styles from './index.module.scss';

interface Props {
  label: string;
  title: string;
  list: {
    url: string;
    stepIndex: string;
    stepName: string;
    title: string;
    des: string;
  }[];
}

export default function EasyToUseBlock(props: Props) {
  const { label, title, list } = props;
  return (
    <WithAnimation animationType="fadeInUp" delay={0} duration={800}>
      <div className={styles.container}>
        <LabelMod text={label} />
        <div className={styles.title}>{title}</div>
        <div className={styles.list}>
          <Row gutter={[0, 24]} className={styles.easyRow}>
            {list.map((item, index) => (
              <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8} style={{ display: 'flex' }}>
                <div className={styles.item}>
                  <picture>
                    <img
                      src={item?.url}
                      alt={item?.title}
                      className={styles.img}
                      width={400}
                      height={'auto'}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className={styles.stepIndexContainer}>
                    <div className={styles.stepIndex}>{item?.stepIndex}</div>
                    <div className={styles.stepName}>{item?.stepName}</div>
                  </div>
                  <div className={styles.itemTitle}>{item?.title}</div>
                  <div className={styles.itemDes}>{item?.des}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </WithAnimation>
  );
}
