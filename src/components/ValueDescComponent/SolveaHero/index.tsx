import { default as classNames, default as cx } from 'classnames';
import { Button } from 'pages/mod/Button';
import { useRef, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  isTextToImage: boolean;
  descriptionInfo: {
    mode: 'old' | 'new';
    title: string;
    h1?: boolean;
    subTitle: string;
    content: string;
    button: { text: string; href: string };
  };
  pictureUrl: string;
  videoUrl?: string;
}
export default function SolveaHero(props: Props) {
  const { isTextToImage, descriptionInfo, pictureUrl, videoUrl } = props;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };

  const handleVideoClose = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={cx(styles.container, {
        [styles.textToImage]: isTextToImage,
        [styles.hasButton]: descriptionInfo.mode === 'new',
      })}
    >
      <div className={styles.textContainer}>
        {descriptionInfo.title &&
          (descriptionInfo.h1 ? (
            <h1 className={cx(styles.title)}>{descriptionInfo.title}</h1>
          ) : (
            <div className={cx(styles.title)}>{descriptionInfo.title}</div>
          ))}
        {descriptionInfo.subTitle && (
          <div className={cx(styles.text, styles.subTitle)}>{descriptionInfo.subTitle}</div>
        )}
        {descriptionInfo.content && <div className={styles.text}>{descriptionInfo.content}</div>}
        {descriptionInfo.button?.text && (
          <a href={descriptionInfo.button.href} className={styles.buttonLink} target="_blank">
            <Button className={styles.button}>{descriptionInfo.button.text}</Button>
          </a>
        )}
      </div>
      <div className={styles.pictureContainer}>
        {videoUrl && !isVideoPlaying ? (
          // 有视频URL且未播放：显示图片 + 播放按钮
          <div className={styles.videoThumbnail}>
            <img
              className={classNames({
                [styles.picture]: true,
                [styles.videoThumbnailPicture]: true,
              })}
              src={pictureUrl}
              alt="video thumbnail"
            />
            <button className={styles.playButton} onClick={handlePlayClick} aria-label="play video">
              <svg className={styles.playSvg} viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21" />
              </svg>
            </button>
          </div>
        ) : videoUrl && isVideoPlaying ? (
          // 有视频URL且正在播放：显示视频
          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              className={styles.picture}
              src={videoUrl}
              loop
              playsInline
              controls
              autoPlay
            />
            <button className={styles.closeButton} onClick={handleVideoClose} aria-label="关闭视频">
              ✕
            </button>
          </div>
        ) : (
          // 没有视频URL：只显示图片
          <img
            className={styles.picture}
            src={pictureUrl}
            alt="picture"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}
