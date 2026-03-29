import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { Popover } from 'antd';
import { sumLog } from 'shulex-util';
import { NavData } from '../navigation';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  text?: string; // 名称
  description?: string; // 描述
  target?: string;
  logo?: any; // 前置图标
  qrCode?: string;
  onClick?: (_e: React.MouseEvent<HTMLAnchorElement>) => void;
  sum?: string;
  titleClassName?: string;
  items?: NavData[];
}

export default function NavLink(props: Props) {
  const {
    className,
    style,
    href,
    text,
    onClick,
    target,
    logo,
    qrCode,
    sum,
    description,
    titleClassName,
    items,
  } = props;
  if (qrCode) {
    return (
      <>
        {logo}
        <Popover
          content={
            <img
              style={{ height: 120, width: 120 }}
              src={qrCode}
              alt="follow our Tiktok"
            />
          }
          placement="right"
          zIndex={9999999}
        >
          <a
            className={cx(styles.navLink, className)}
            style={style}
            onClick={(e) => {
              if (onClick) onClick(e);
              if (sum) {
                sumLog(sum);
              }
            }}
          >
            {text}
          </a>
        </Popover>
      </>
    );
  }
  return (
    <a
      className={cx(
        styles.container,
        { [styles.vertical]: items, [styles.noClick]: !href },
        className,
      )}
      href={href}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        if (sum) {
          sumLog(sum);
        }
      }}
      style={style}
      target={target || '_self'}
    >
      {logo}
      <div className={cx(styles.navLink)}>
        {text && (
          <span className={cx(styles.title, titleClassName)}>{text}</span>
        )}
        {description && <span className={styles.desc}>{description}</span>}
      </div>
      {(items || [])?.length > 0 && (
        <div>
          {items?.map((item) => {
            const { name, href } = item;
            return (
              <a key={href} className={styles.item} href={href}>
                {name}
              </a>
            );
          })}
        </div>
      )}
    </a>
  );
}
