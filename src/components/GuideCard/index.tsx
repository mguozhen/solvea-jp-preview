import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { ListItem } from 'components/Icons';
import DefaultBtn from 'components/DefaultBtn';
import i18n from '@/i18n';

interface Props {
  className?: string;
  title?: string;
  describtion?: string;
  list: string[];
  image?: string;
  revised?: boolean;
  link?: string;
}

export default function GuideCard(props: Props) {
  const { className, title, describtion, list, image, revised, link } = props;
  return (
    <div
      className={cx(styles.container, className, {
        [styles.reviseContent]: revised,
      })}
    >
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.describtion}>{describtion}</div>
        <div className={styles.list}>
          {list.map((item, index) => (
            <div key={index} className={styles.item}>
              <ListItem className={styles.listItemIcon} />
              <div className={styles.listContent}>{item}</div>
            </div>
          ))}
        </div>
        {link && (
          <DefaultBtn className={styles.btn} href={link}>
            {i18n('layout.Common_GetStarted')}
          </DefaultBtn>
        )}
      </div>
      <div className={styles.imgBox}>
        <img src={image} alt="chatbot" className={styles.img} />
      </div>
    </div>
  );
}
