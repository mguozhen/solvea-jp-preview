import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

export interface BlogProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  content?: string;
}

export default function Article(props: BlogProps) {
  const { className, style, title, content } = props;
  return (
    <div className={cx(styles.container, className)} style={style}>
      {title && (
        <h2
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }}
        ></h2>
      )}
      {content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
        />
      )}
    </div>
  );
}
