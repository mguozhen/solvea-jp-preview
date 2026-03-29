import React from 'react';
import styles from './index.module.scss';
import ArrowRightIcon from '@/components/Icons/ArrowRight';
import cx from 'classnames';
import { sumLog } from 'shulex-util';
export interface ActionButtonProps {
  headTitle?: string;
  className?: string;
  style?: React.CSSProperties;
  title: string;
  subtitle?: string;
  href?: string;
  sum?: string;
  theme?: string;
  logo?: any;
  hideArrow?: boolean;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  headSubTitle?: string;
  titleColor?: string;
  tag?: string;
  textTheme?: 'dark' | 'light';
  color?: string;
  btnStyle?: any;
  showVideo?: boolean;
}

export default function ActionButton(props: ActionButtonProps) {
  const {
    headTitle,
    href,
    title,
    subtitle,
    className,
    style,
    sum,
    onClick,
    theme,
    logo,
    hideArrow,
    target,
    headSubTitle,
    titleColor,
    tag,
    textTheme = 'light',
    color,
    btnStyle,
  } = props;

  return (
    <>
      <div
        className={cx(styles.btnBox, className, {
          [styles.nopadding]: headTitle || headSubTitle,
          [styles.dark]: textTheme === 'dark',
          [styles.light]: textTheme === 'light',
        })}
        style={style}
      >
        {(headTitle || headSubTitle) && (
          <div className={styles.head}>
            {headTitle && (
              <h2
                className={styles.headTitle}
                dangerouslySetInnerHTML={{
                  __html: headTitle.replace(/\n/g, '<br/>'),
                }}
                style={titleColor ? { color: titleColor } : {}}
              />
            )}
            {headSubTitle && (
              <div
                className={styles.headSubTitle}
                dangerouslySetInnerHTML={{
                  __html: headSubTitle.replace(/\n/g, '<br/>'),
                }}
                style={titleColor ? { color: titleColor } : {}}
              />
            )}
          </div>
        )}
        <a
          className={styles.a}
          href={href}
          style={{ background: theme, color: color, ...btnStyle }}
          target={target || '_self'}
          onClick={(e) => {
            if (sum) {
              sumLog(sum);
            }
            if (onClick) {
              onClick(e);
            }
          }}
        >
          {logo}
          {title}
          {!hideArrow && <ArrowRightIcon />}
          {tag && <div className={styles.tag}>{tag}</div>}
        </a>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </>
  );
}
