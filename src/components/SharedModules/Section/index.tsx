import React, { PropsWithChildren, useEffect } from 'react';
import styles from './index.module.scss';
import AOS from 'aos';
import cx from 'classnames';

interface Props {
  title?: string;
  subTitle?: string;
  background?: string;
  style?: React.CSSProperties;
  classname?: string;
  childrenClassName?: string;
  titleStyle?: React.CSSProperties;
  subTitleStyle?: React.CSSProperties;
  titleClass?: string;
  subTitleClass?: string;
  h1?: boolean;
}

export default function Section(props: PropsWithChildren<Props>) {
  const {
    title,
    subTitle,
    children,
    background,
    classname,
    childrenClassName,
    titleStyle,
    titleClass,
    subTitleStyle,
    subTitleClass,
    style,
    h1,
  } = props;
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className={cx(styles.container, classname, {
        [styles.white]: background === 'white',
      })}
      style={style}
    >
      {(title || subTitle) && (
        <div className={styles.head} data-aos="fade">
          {title && h1 && (
            <div
              className={cx(styles.title, titleClass)}
              style={
                subTitle
                  ? { marginBottom: 8, ...titleStyle }
                  : { ...titleStyle }
              }
              dangerouslySetInnerHTML={{
                __html: title.replace(/\n/g, '<br/>'),
              }}
            ></div>
          )}
          {title && !h1 && (
            <h2
              className={cx(styles.title, titleClass)}
              style={
                subTitle
                  ? { marginBottom: 8, ...titleStyle }
                  : { ...titleStyle }
              }
              dangerouslySetInnerHTML={{
                __html: title.replace(/\n/g, '<br/>'),
              }}
            ></h2>
          )}
          {subTitle && (
            <div
              className={cx(styles.subTitle, subTitleClass)}
              style={{ ...subTitleStyle }}
              dangerouslySetInnerHTML={{ __html: subTitle }}
            ></div>
          )}
        </div>
      )}
      {children && (
        <div className={cx(styles.children, childrenClassName)}>{children}</div>
      )}
    </div>
  );
}
