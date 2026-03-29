import React, { ReactElement, useState } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { Play, VideoPlay } from 'components/Icons';
import ActionButton from '../ActionButton';
import { ACTION_BTN_DEFAULT_COLOR } from 'theme/color';
import { useI18n } from '@/i18n';

interface HeroComponentProps {
  className?: string;
  style?: React.CSSProperties;
  image?: string;
  imageAlt?: string;
  videoBackground?: string; // 视频的封面图
  videoIntro?: string; // 视频封面图的介绍文字
  imageSize?: 'cover' | 'contain';
  title?: string;
  subtitle?: string;
  leftElement?: any;
  content?: string;
  button?: ReactElement;
  textClassName?: string;
  // 最底部小描述
  description?: string;
  video?: string;
  textStyle?: string;
  audioStyle?: React.CSSProperties;
  direction?: 'imgRight' | 'imgLeft';
  textElement?: any;
  videoType?: string;
  theme?: 'dark' | 'light';
  action?: {
    title?: string;
    href?: string;
    theme?: string;
    hideArrow?: boolean;
    className?: string;
  };
  action2?: {
    title?: string;
    href?: string;
    theme?: string;
    hideArrow?: boolean;
    className?: string;
  };
  rightElement?: React.ReactNode;
  h2?: boolean;
  h1?: boolean;
  isUaMobile?: boolean;
  loopVideo?: {
    src?: string;
    mobileReplaceImg?: string; // 移动端视频经常加载不出来 用静态图片代替
  };
  textMaxWidth?: number;
  imgMaxWidth?: number;
  iconTitle?: {
    icon?: string;
    content?: React.ReactNode;
  };
}

export default function HeroComponent(props: HeroComponentProps) {
  const {
    className,
    style,
    imageAlt,
    title,
    image,
    subtitle,
    content,
    description,
    direction,
    button,
    video,
    textStyle,
    imageSize = 'cover',
    audioStyle,
    videoBackground,
    videoIntro,
    textElement,
    leftElement,
    videoType,
    theme = 'light',
    action,
    rightElement,
    textClassName,
    h2,
    isUaMobile,
    loopVideo,
    h1,
    action2,
    textMaxWidth,
    imgMaxWidth,
    iconTitle,
  } = props;

  const { locale } = useI18n();

  const [videoShow, setVideoShow] = useState(false);

  return (
    <div
      className={cx(styles.container, className, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
      })}
      style={style}
    >
      <div
        className={cx(styles.imgContainer, {
          [styles.imgRight]: direction === 'imgRight',
          [styles.imgLeft]: direction === 'imgLeft',
        })}
        style={
          imgMaxWidth ? { maxWidth: +imgMaxWidth, ...audioStyle } : audioStyle
        }
      >
        {rightElement}
        {loopVideo && loopVideo.src && !isUaMobile && (
          <video
            className={styles.rightVideo}
            src={loopVideo?.src}
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        {loopVideo &&
          loopVideo?.src &&
          isUaMobile &&
          !loopVideo?.mobileReplaceImg && (
            <video
              className={styles.rightVideo}
              src={loopVideo?.src}
              autoPlay
              muted
              playsInline
              loop
            />
          )}

        {loopVideo &&
          loopVideo?.src &&
          loopVideo?.mobileReplaceImg &&
          isUaMobile && (
            <img
              src={loopVideo?.mobileReplaceImg}
              style={{ width: '100%', maxHeight: 700, objectFit: 'contain' }}
            />
          )}
        {!video && image && (
          <img
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
            style={{ ...audioStyle, width: '100%', height: 'auto' }}
            className={cx(styles.img, {
              [styles[imageSize]]: true,
            })}
            src={image}
            title={imageAlt}
            alt={imageAlt ?? ''}
          />
        )}
        {videoBackground && !videoShow && video && (
          <div className={styles.titleContainer} style={audioStyle}>
            <img
              src={videoBackground}
              title={imageAlt}
              alt={imageAlt ?? ''}
              width={800}
              height={450}
              style={{ ...audioStyle, width: '100%', height: 'auto' }}
              loading="lazy"
              decoding="async"
              className={styles.videoBg}
            />
            {videoIntro && (
              <div
                className={styles.videoTitle}
                dangerouslySetInnerHTML={{
                  __html: videoIntro.replace(/\n/g, '<br/>'),
                }}
              ></div>
            )}

            {videoType === 'youtube' && (
              <VideoPlay
                onClick={() => {
                  setVideoShow(true);
                }}
                className={styles.iconPlay}
              />
            )}
            {videoType !== 'youtube' && (
              <Play
                onClick={() => {
                  setVideoShow(true);
                }}
                className={styles.iconPlay}
              />
            )}
          </div>
        )}
        {videoBackground && videoShow && video && (
          <iframe
            className={styles.video}
            style={audioStyle}
            src={video}
            scrolling="no"
            frameBorder="no"
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
        {!videoBackground && video && (
          <iframe
            className={styles.video}
            style={audioStyle}
            src={video}
            scrolling="no"
            frameBorder="no"
            allowFullScreen
            // loading="lazy"
          ></iframe>
        )}
      </div>
      <div
        className={cx(styles.text, textClassName)}
        style={textMaxWidth ? { maxWidth: +textMaxWidth } : {}}
      >
        {iconTitle && (
          <div className={styles.iconTitle}>
            {iconTitle?.icon && (
              <div className={styles.icon}>
                <img src={iconTitle?.icon} alt="voc" className={styles.img} />
              </div>
            )}
            <div className={styles.icontext}>{iconTitle?.content}</div>
          </div>
        )}
        {leftElement && <div className={styles.leftElement}>{leftElement}</div>}
        {title && !h2 && !h1 && (
          <h3
            className={cx(styles.title, textStyle)}
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
        )}
        {title && h2 && (
          <h2
            className={cx(styles.title, textStyle)}
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        )}
        {title && h1 && (
          <div
            className={cx(styles.title, styles.h1, textStyle)}
            dangerouslySetInnerHTML={{ __html: title }}
          ></div>
        )}
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {content && (
          <div
            className={cx(styles.content, {
              [styles.cnLine]: locale === 'zh-CN',
            })}
            dangerouslySetInnerHTML={{
              __html: content?.replace(/\n/g, '<br/>'),
            }}
          ></div>
        )}
        {textElement && <div className={styles.textElement}>{textElement}</div>}
        {description && (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, '<br/>'),
            }}
          ></div>
        )}
        {button}
        <div className={styles.btns}>
          {action?.title && (
            <ActionButton
              className={cx(styles.actionBtn, action?.className)}
              title={action?.title}
              href={action?.href}
              hideArrow={action?.hideArrow}
              target="_blank"
              {...action}
              theme={action?.theme || ACTION_BTN_DEFAULT_COLOR}
            />
          )}
          {action2?.title && (
            <ActionButton
              className={cx(styles.actionBtn, action2?.className)}
              title={action2?.title}
              href={action2?.href}
              hideArrow={action2?.hideArrow}
              target="_blank"
              {...action2}
              theme={action2?.theme || ACTION_BTN_DEFAULT_COLOR}
            />
          )}
        </div>
      </div>
      {/* <div className={styles.clear} /> */}
    </div>
  );
}
