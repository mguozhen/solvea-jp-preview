import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import i18n from '@/i18n';

interface Props {
  className?: string;
  title?: string;
  socialLinks?: Array<{
    desc: string;
  }>;
}

export default function Community(props: Props) {
  const { className, title, socialLinks } = props;

  // 默认数据
  const defaultList = [
    {
      desc: i18n('layout.Solvea_task_impact'),
    },
    {
      desc: i18n('layout.Solvea_Digital_Employees'),
    },
    {
      desc: i18n('layout.Fantastic_Chatbot'),
    },
  ];

  const tips = i18n('layout.Dont_Take_Word_For');
  const defaultTitle = title || i18n('layout.Community_Saying');

  // 使用传入的数据或默认数据
  const list = socialLinks || defaultList;

  return (
    <div
      className={cx(styles.container, className)}
      data-aos="fade"
      style={{ maxWidth: 1200 }}
    >
      <div className={styles.tips}>{tips}</div>
      <h2 className={styles.title}>{defaultTitle}</h2>
      <div className={styles.listBox}>
        {list.map((item, index) => {
          return (
            <div key={index} className={styles.listItem}>
              <div className={styles.itemContent}>{item.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
