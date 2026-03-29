import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import SvgCheckRight2 from 'components/Icons/CheckRight2';

export interface BlogProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  content?: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  smallImage?: boolean;
  imageSize?: 'contain' | 'cover';
  type?: 'odd' | 'even';
  list?: Array<{ text?: string; checked?: boolean }>;
  top?: {
    icon?: React.ReactNode;
    text?: string;
  };
  background?: string;
  textColor?: string;
}

export default function Blog(props: BlogProps) {
  const {
    className,
    style,
    href,
    title,
    content,
    image,
    imageAlt,
    smallImage,
    type = 'odd',
    list,
    top,
    background,
    textColor,
  } = props;

  return (
    <div
      className={cx(
        styles.container,
        {
          [styles.smallImage]: smallImage,
          [styles.evenContainer]: type === 'even',
        },
        className,
      )}
      style={style}
    >
      {top && (
        <div className={styles.top}>
          {top?.icon}
          <h3 style={{ color: textColor }}>{top?.text}</h3>
        </div>
      )}
      {href ? (
        <a
          className={cx(styles.inner, { [styles.even]: type === 'even' })}
          href={href}
          target="_blank"
        >
          <div className={cx(styles.img)}>
            <img
              className={cx(styles.ig)}
              src={image}
              alt={imageAlt}
              title={imageAlt}
              loading="lazy"
            />
          </div>
          <div className={styles.text}>
            {title && <div className={styles.title}>{title}</div>}
            {content && <div className={styles.content}>{content}</div>}
            <div className={styles.a}>
              <span>Learn More</span>
              <span>{'>'}</span>
            </div>
          </div>
        </a>
      ) : (
        <div className={cx(styles.inner, { [styles.even]: type === 'even' })}>
          <div className={styles.img}>
            <img
              className={styles.ig}
              src={image}
              alt={imageAlt}
              title={imageAlt}
              loading="lazy"
            />
          </div>
          <div
            className={styles.text}
            style={{ background: background, color: textColor }}
          >
            {title && <div className={styles.title}>{title}</div>}
            {content && <div className={styles.content}>{content}</div>}
            {Array.isArray(list) && (
              <div className={styles.list}>
                {list?.map((item) => {
                  return (
                    <div key={item?.text} className={styles.item}>
                      {item?.checked && (
                        <SvgCheckRight2 className={styles.icon} />
                      )}
                      <span>{item?.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
