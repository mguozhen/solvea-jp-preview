import { Col, Row } from 'antd';
import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import WithAnimation from 'components/WithAnimation';
import styles from './index.module.scss';

interface Props {
  label: string;
  title: string;
  list: {
    company: string;
    des: string;
    name: string;
    position: string;
  }[];
  button: {
    text: string;
    link: string;
  };
}

export default function TestimonialsBlock(props: Props) {
  const { label, title, list, button } = props;
  return (
    <WithAnimation animationType="fadeInUp" delay={0} duration={800}>
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.list}>
          <Row gutter={24}>
            {list.map((item, index) => (
              <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8} style={{ display: 'flex' }}>
                <div key={index} className={styles.item}>
                  <picture>
                    <img
                      src={item?.company}
                      className={styles.itemCompany}
                      alt={item?.name}
                      width={120}
                      height={'auto'}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className={styles.itemDes}>{item?.des}</div>
                  <div className={styles.itemName}>{item?.name}</div>
                  <div className={styles.itemPosition}>{item?.position}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <GetStartedBtn
          link={button.link}
          text={button.text}
          type="black"
          className={styles.button}
          id="testimonialCta"
        />
      </div>
    </WithAnimation>
  );
}
