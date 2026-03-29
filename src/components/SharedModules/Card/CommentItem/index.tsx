import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

interface Props extends BaseCSSProps {
  avatar?: any;
  name?: string;
  job?: string;
  comment?: string;
  date?: string;
  time?: string;
}

export default function CommentItem(props: Props) {
  const { className, style, name, job, comment, avatar } = props;

  return (
    <div className={cx(styles.container, className)} style={style}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img
            src={avatar}
            alt="avatar"
            title="avatar"
            className={styles.icon}
            loading="lazy"
          />
        </div>
        <div className={styles.title}>
          <div className={styles.name}>{name}</div>
          <div className={styles.job}>{job}</div>
        </div>
      </div>
      <div className={styles.content}>{comment}</div>
    </div>
  );
}
