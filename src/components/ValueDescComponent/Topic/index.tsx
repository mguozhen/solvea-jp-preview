import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import ActionButton from '../ActionButton';

interface TopicProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
  lists?: string[];
  action?: string;
  href?: string;
  sum?: string; // sum埋点
  action2?: string;
  href2?: string;
  sum2?: string; // sum埋点2
  image?: string;
  imageAlt?: string;
  qrCode?: string; // 是否是验证码
  qrCodeTitle?: string;
  showVideo1?: boolean;
  showVideo2?: boolean;
  h1?: boolean; // true时标题改为h2标签
  actionTheme1?: string;
  actionTheme2?: string;
  actionHideArrow?: boolean;
  fillWidth?: boolean;
  fillImage?: boolean;
  bigTitle?: boolean;
}

export default function Topic(props: TopicProps) {
  const {
    className,
    style,
    title,
    subtitle,
    lists = [],
    href,
    action,
    image,
    imageAlt,
    action2,
    href2,
    qrCode,
    qrCodeTitle,
    sum,
    sum2,
    showVideo1,
    showVideo2,
    actionTheme1,
    actionTheme2,
    actionHideArrow,
    fillWidth,
    fillImage,
    bigTitle,
  } = props;
  let { h1 } = props;
  h1 = h1 ?? true;
  return (
    <div
      className={cx(styles.top, className, {
        [styles.fillWidth]: fillWidth,
      })}
      style={style}
    >
      <div className={styles.text}>
        {h1 ? (
          <div
            className={cx(styles.title, styles.hTitle, {
              [styles.bigTitle]: bigTitle,
            })}
            dangerouslySetInnerHTML={{
              __html: title?.replace(/\n/g, '<br/>') ?? '',
            }}
          ></div>
        ) : (
          <h2
            className={cx(styles.title, styles.hTitle)}
            dangerouslySetInnerHTML={{
              __html: title?.replace(/\n/g, '<br/>') ?? '',
            }}
          ></h2>
        )}

        <div className={styles.content}>
          {subtitle}
          {lists?.length > 0 && lists?.[0] !== '' && (
            <ul>
              {lists?.map((list, id) => {
                return (
                  <li
                    key={id}
                    dangerouslySetInnerHTML={{
                      __html: list?.replace(/\n/g, '<br/>'),
                    }}
                  ></li>
                );
              })}
            </ul>
          )}
          {action && (
            <div className={styles.btnBox}>
              <ActionButton
                showVideo={showVideo1}
                href={href}
                title={action}
                target="_blank"
                sum={sum}
                theme={actionTheme1}
                hideArrow={actionHideArrow}
              />
            </div>
          )}
          {action2 && (
            <div className={styles.btnBox}>
              <ActionButton
                showVideo={showVideo2}
                href={href2}
                title={action2}
                target="_blank"
                sum={sum2}
                theme={actionTheme2}
                hideArrow={actionHideArrow}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={cx(styles.imgContainer, {
          [styles.isQR]: qrCode,
          [styles.fillImage]: fillImage,
        })}
      >
        {qrCode && (
          <div className={styles.qrCodeContainer}>
            <div className={styles.qrCodeTitle}>{qrCodeTitle}</div>
            <img
              className={styles.qrCode}
              src={qrCode}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        {!qrCode && (
          <img
            className={styles.img}
            src={image}
            alt={imageAlt}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
