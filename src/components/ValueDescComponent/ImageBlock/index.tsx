import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface ImageBlockProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  content?: string;
}

export default function ImageBlock(props: ImageBlockProps) {
  const { className, style, title, subtitle, content, image, imageAlt } = props;
  return (
    <div className={cx(styles.container, className)} style={style}>
      <div className={styles.imgContainer}>
        <img
          src={image}
          className={styles.img}
          alt={imageAlt ?? ''}
          width={234}
          height={180}
          loading="lazy"
          decoding="async"
        />
      </div>
      {title && <div className={styles.title}>{title}</div>}
      {subtitle && <div className={styles.title}>{subtitle}</div>}
      {content && <div className={styles.content}>{content}</div>}
    </div>
  );
}
