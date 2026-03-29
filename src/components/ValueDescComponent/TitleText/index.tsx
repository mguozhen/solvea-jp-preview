import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

export interface TitleTextProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
  titleAlign?: string;
  subtitleAlign?: string;
  margin?: string;
  darkTheme?: boolean;
  // 底部小字描述
  lists?: string[];
  large?: boolean; // 是否超大主标题
  h1?: boolean; // 是否是h1标签
  bigWidth?: boolean; // 适配到更宽的宽度 title原最大宽度960px
  titleMargin?: string;
  subTitleClassName?: string;
  content?: React.ReactNode;
  theme?: 'dark' | 'light';
}

export default function TitleText(props: TitleTextProps) {
  const {
    className,
    style,
    title,
    subtitle,
    titleAlign = 'center',
    subtitleAlign = 'center',
    lists,
    large,
    darkTheme = true,
    h1,
    bigWidth, // 不支持，自动适配不同尺寸
    titleMargin, // 不支持，自动适配不同尺寸
    subTitleClassName,
    content,
    theme,
  } = props;
  const ls = lists?.filter(Boolean) ?? [];
  return (
    <div
      className={cx(styles.container, className, {
        [styles.darkTheme]: darkTheme || theme === 'light',
        [styles.dark]: theme === 'dark',
      })}
      style={{
        ...style,
        alignItems: titleAlign
          ? { center: 'center', left: 'flex-start', right: 'flex-end' }[
              titleAlign
            ]
          : undefined,
      }}
    >
      {title && h1 && (
        <div
          className={cx(styles.title, styles.h1, {
            [styles.large]: large,
            [styles.bigWidth]: bigWidth,
          })}
          style={{ textAlign: titleAlign as any, marginBottom: titleMargin }}
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }}
        ></div>
      )}
      {title && !h1 && (
        <h2
          className={cx(styles.title, {
            [styles.bigWidth]: bigWidth,
            [styles.large]: large,
          })}
          style={{ textAlign: titleAlign as any, marginBottom: titleMargin }}
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }}
        ></h2>
      )}
      {subtitle && (
        <div
          className={cx(styles.subtitle, subTitleClassName, {
            [styles.bigWidth]: bigWidth,
          })}
          style={{ textAlign: subtitleAlign as any }}
          dangerouslySetInnerHTML={{
            __html: subtitle?.replace(/\n/g, '<br/>'),
          }}
        ></div>
      )}
      {ls?.length > 0 && (
        <div className={styles.listContainer}>
          {ls.map((desc) => {
            return <span key={desc} className={styles.list}>{desc}</span>;
          })}
        </div>
      )}
      {content}
    </div>
  );
}
