import React from 'react';
import styles from './index.module.scss';
import BrandScreen from 'components/BrandScreen';
import cx from 'classnames';
import i18n from '@/i18n';

interface SupportPlatformTexts {
  title?: string;
  desc?: string;
}

interface Props {
  className?: string;
  list1?: string[];
  list2?: string[];
  texts?: SupportPlatformTexts;
}

export default function SupportPlatfoem(props: Props) {
  const { className, list1: propsList1, list2: propsList2, texts } = props;

  // 默认数据
  const defaultList1 = [
    i18n('layout.Troubleshooting_Key'),
    i18n('layout.Logistics_Inquiry'),
    i18n('layout.Product_Recommendation'),
    i18n('layout.Usage_Guidance'),
    i18n('layout.Refund_Exchange'),
  ];

  const defaultList2 = [
    i18n('layout.Early_Warning'),
    i18n('layout.Customized_Workflow'),
    i18n('layout.Smart_Inspection'),
    i18n('layout.Self_Training'),
    i18n('layout.Analysis_key'),
  ];

  // 使用传入的数据或默认数据
  const list = propsList1 || defaultList1;
  const list2 = propsList2 || defaultList2;

  // 使用传入的文案或默认文案
  const title = texts?.title || i18n('layout.Smart_Support_Platform');
  const desc = texts?.desc || i18n('layout.Solvea_Enterprise_AI');

  return (
    <div className={cx(styles.container, className)}>
      <h3 className={styles.title}>{title}</h3>
      <h5 className={styles.desc}>{desc}</h5>
      <BrandScreen
        className={styles.listBox}
        brands={list.map((item, index) => (
          <div
            key={index}
            className={cx(styles.itemBox, styles[`itemBox${index % 4}`])}
          >
            {item}
          </div>
        ))}
      />
      <BrandScreen
        className={styles.listBox}
        // delay
        brands={list2.map((item, index) => (
          <div
            key={index}
            className={cx(styles.itemBox, styles[`itemBox${(index + 2) % 4}`])}
          >
            {item}
          </div>
        ))}
      />
    </div>
  );
}
