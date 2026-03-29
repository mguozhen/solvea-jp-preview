'use client';

import i18n from '@/i18n';
import cx from 'classnames';
import { Button } from 'pages/mod/Button';
import { useEffect, useRef, useState } from 'react';
import { getLink } from 'util/getLink';
import styles from './OptimizedVideoPlayer.module.scss';

interface OptimizedVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/**
 * 优化的视频播放器组件
 * 针对大文件（如123MB）进行了以下优化：
 * 1. 支持HTTP Range请求（Next.js自动支持）
 * 2. 懒加载：仅当视频进入视口中间（50%可见）时才开始加载
 * 3. 预加载策略：preload="metadata" 只加载元数据，不阻塞页面
 * 4. 分段加载：浏览器自动使用Range请求分段加载
 * 5. 延迟自动播放：即使设置autoPlay=true，也会等到视频滚动到视口中间才加载和播放
 *    这样既保留了自动播放效果，又不会阻塞首屏加载
 */
export default function OptimizedVideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  onPlay,
  onPause,
  onEnded,
}: OptimizedVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false); // 始终使用懒加载
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false); // 控制是否自动播放

  // 使用 Intersection Observer 实现懒加载（即使是自动播放也使用）
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            // 如果需要自动播放，在视频加载后触发
            if (autoPlay) {
              setShouldAutoPlay(true);
            }
          }
        });
      },
      {
        rootMargin: '0px', // 不提前加载，等到真正进入视口
        threshold: 0.5, // 当视频50%可见（中间位置）时才触发
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [autoPlay]);

  // 处理视频加载事件
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isIntersecting) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleLoadedMetadata = () => {
      // 元数据加载完成，开始显示视频
      console.log('Video metadata loaded');
    };

    const handleCanPlay = () => {
      // 可以开始播放，隐藏加载状态
      setIsLoading(false);
      console.log('Video can play');

      // 如果需要自动播放，在视频准备好后触发
      if (shouldAutoPlay && video) {
        video.play().catch((err) => {
          console.warn('Auto-play failed:', err);
          // 自动播放失败通常是因为浏览器策略，这是正常的
        });
        setShouldAutoPlay(false); // 只尝试一次
      }
    };

    const handleCanPlayThrough = () => {
      // 可以播放到结束而不需要缓冲
      setIsLoading(false);
      console.log('Video can play through');
    };

    const handleError = (_e: Event) => {
      setIsLoading(false);
      const error = (video.error && video.error.message) || '视频加载失败，请稍后重试';
      setError(error);
      console.error('Video error:', video.error);
    };

    const handlePlay = () => {
      setIsLoading(false);
      onPlay?.();
    };

    const handlePause = () => {
      onPause?.();
    };

    const handleEnded = () => {
      onEnded?.();
    };

    // 如果视频已经可以播放，直接设置加载完成
    if (video.readyState >= 3) {
      setIsLoading(false);
    }

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isIntersecting, shouldAutoPlay, onPlay, onPause, onEnded]);

  console.log(i18n('solvea.Home_newhero_slogan').split('\n'));

  return (
    <div ref={containerRef} className={cx(styles.container, className)}>
      <h1 className={styles.newhero_slogan_container}>
        {i18n('solvea.Home_newhero_slogan')
          .split('\n')
          .map((line, index) => (
            <div className={styles.newhero_slogan} key={index}>
              {line}
            </div>
          ))}
      </h1>
      <div className={styles.newhero_desc_container}>
        {i18n('solvea.Home_newhero_desc')
          .split('\n')
          .map((line, index) => (
            <div className={styles.newhero_desc} key={index}>
              {line}
            </div>
          ))}
      </div>
      <a href={getLink('/contact')} target={'_blank'} className={styles.btnLink}>
        <Button className={styles.btn}>{i18n('solvea.Home_GET_A_DEMO')}</Button>
      </a>
      <div className={styles.video_container}>
        <video
          ref={videoRef}
          className={styles.video}
          src={isIntersecting ? src : undefined}
          poster={poster}
          preload="none" // 始终只加载元数据，不阻塞页面
          autoPlay={true} // 使用编程方式控制自动播放，而不是原生autoPlay
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline // 移动端内联播放
          // 启用分段加载（浏览器自动使用HTTP Range请求）
          // 这些属性让浏览器可以智能地分段请求视频数据
        >
          您的浏览器不支持视频播放。
        </video>

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <span>{i18n('solvea.Homepage_video_loading')}</span>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.error}>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
