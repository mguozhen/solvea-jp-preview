import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';
import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import LabelMod from 'components/ValueDescComponent/LabelMod';
import WithAnimation from 'components/WithAnimation';
import styles from './index.module.scss';

interface Props {
  label: string;
  title: string;
  list: {
    key: string;
    label: string;
    children: string;
  }[];
  button: {
    text: string;
    link: string;
  };
}

export default function FAQBlock(props: Props) {
  const { label, title, list, button } = props;
  const leftLine = list.filter((_, index) => index % 2 === 0);
  const rightline = list.filter((_, index) => index % 2 !== 0);

  return (
    <WithAnimation animationType="fadeInUp" delay={0} duration={800}>
      <div className={styles.container}>
        <LabelMod text={label} className={styles.label} />
        <div className={styles.title}>{title}</div>
        <div className={styles.list}>
          <Row gutter={40} className={styles.faqRow} align="top">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {leftLine.map((item, index) => (
                <Collapse
                  key={index}
                  className={`${index >= list.length - 2 ? styles.noBorder : ''}`}
                  items={[item]}
                  expandIconPosition="end"
                  expandIcon={({ isActive }) =>
                    isActive ? (
                      <MinusOutlined style={{ fontSize: 16 }} />
                    ) : (
                      <PlusOutlined style={{ fontSize: 16 }} />
                    )
                  }
                />
              ))}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {rightline.map((item, index) => (
                <Collapse
                  key={index}
                  className={`${index >= list.length - 2 ? styles.noBorder : ''}`}
                  items={[item]}
                  expandIconPosition="end"
                  expandIcon={({ isActive }) =>
                    isActive ? (
                      <MinusOutlined style={{ fontSize: 16 }} />
                    ) : (
                      <PlusOutlined style={{ fontSize: 16 }} />
                    )
                  }
                />
              ))}
            </Col>
          </Row>
        </div>
        <GetStartedBtn
          link={button.link}
          text={button.text}
          type="black"
          className={styles.button}
          id="faqCta"
        />
      </div>
    </WithAnimation>
  );
}
