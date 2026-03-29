'use client';

import useResizeObserver from '@react-hook/resize-observer';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { useEffect, useRef, useState } from 'react';
import PartLabel from '../PartLabel';
import styles from './index.module.scss';

interface Props {
  partLabel: string;
  title: string;
  mediaReportsList: {
    logoUrl: string;
    subTitle: string;
    description: string;
    href: string;
    reportTime: string;
  }[];
}

export default function MediaReports(props: Props) {
  let { partLabel, title, mediaReportsList } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<CarouselRef>(null);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  // 根据容器宽度计算显示的幻灯片数量
  const calculateSlidesToShow = (width: number) => {
    if (width <= 768) {
      setIsMobile(true);
      return 1; // 移动端显示1张
    } else if (width <= 1024) {
      setIsMobile(true);
      return 2; // 平板显示2张
    } else {
      setIsMobile(false);
      return 3; // 桌面端显示3张
    }
  };

  // 判断是否应该启用轮播
  const shouldEnableCarousel = () => {
    if (isMobile) {
      if (slidesToShow === 2) {
        return mediaReportsList.length > 2;
      } else {
        // 移动端：数量 > 1 时才轮播
        return mediaReportsList.length > 1;
      }
    } else {
      // PC端：数量 > 3 时才轮播
      return mediaReportsList.length > 3;
    }
  };

  const enableCarousel = shouldEnableCarousel();

  // 根据实际卡片数量调整显示数量，避免显示空白
  const actualSlidesToShow = Math.min(slidesToShow, mediaReportsList.length);

  // 初始化时设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      setSlidesToShow(calculateSlidesToShow(width));
    }

    // 同时监听 window resize 作为备选方案
    const handleWindowResize = () => {
      const width = window.innerWidth;
      const newSlidesToShow = calculateSlidesToShow(width);
      setSlidesToShow((prev) => {
        if (prev !== newSlidesToShow) {
          return newSlidesToShow;
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // 使用 useResizeObserver 监听容器大小变化
  useResizeObserver(containerRef, (entry) => {
    const width =
      entry.borderBoxSize?.[0]?.inlineSize || entry.contentRect.width || window.innerWidth;
    if (width) {
      const newSlidesToShow = calculateSlidesToShow(width);
      setSlidesToShow((prev) => {
        // 只有当值真正改变时才更新
        if (prev !== newSlidesToShow) {
          return newSlidesToShow;
        }
        return prev;
      });
    }
  });

  // 当 slidesToShow 改变时，强制 Carousel 重新初始化
  useEffect(() => {
    if (carouselRef.current) {
      // 使用 setTimeout 确保 DOM 已更新
      const timer = setTimeout(() => {
        try {
          const carousel = carouselRef.current as any;
          // 尝试调用内部方法刷新 Carousel
          if (carousel?.innerSlider) {
            carousel.innerSlider.setPosition();
            carousel.innerSlider.onWindowResized();
          }
        } catch (e) {
          // 如果方法不存在，忽略错误
          console.debug('Carousel update method not available');
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [actualSlidesToShow]);

  // 渲染单个幻灯片
  const renderSlide = (item: Props['mediaReportsList'][0]) => (
    <div className={styles.slideWrapper}>
      <div className={styles.slideContent}>
        <div className={styles.headerWrapper}>
          {/* 图片 */}
          {item.logoUrl && (
            <div className={styles.logoWrapper}>
              <img
                src={item.logoUrl}
                alt={item.subTitle}
                className={styles.logo}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* 引号图标 */}
          <div className={styles.quoteIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
              <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
            </svg>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          {/* 副标题 */}
          {item.subTitle && <div className={styles.subTitle}>{item.subTitle}</div>}
          {/* 正文 */}
          {item.description && (
            <div className={styles.description} onClick={() => window.open(item.href, '_blank')}>
              {item.description}
            </div>
          )}
        </div>
        {item.reportTime && <div className={styles.reportTime}>{item.reportTime}</div>}
      </div>
    </div>
  );

  // 切换到上一张
  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  // 切换到下一张
  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* 标题容器 */}
      {title && (
        <div className={styles.titleContainer}>
          <PartLabel partLabel={partLabel} className={styles.partLabel} />
          <div className={styles.title}>{title}</div>
        </div>
      )}
      <div className={styles.carouselContainer}>
        {/* 只有在启用轮播时才显示导航按钮 */}
        {enableCarousel && (
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="#707070"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <Carousel
          ref={carouselRef}
          autoplay={enableCarousel}
          autoplaySpeed={3000}
          speed={700}
          dots={
            enableCarousel
              ? {
                  className: styles.customDots,
                }
              : false
          }
          infinite={enableCarousel}
          slidesToShow={actualSlidesToShow}
          slidesToScroll={1}
          className={styles.carousel}
          key={actualSlidesToShow}
        >
          {mediaReportsList.map((item, index) => (
            <div key={index}>{renderSlide(item)}</div>
          ))}
        </Carousel>
        {/* 只有在启用轮播时才显示导航按钮 */}
        {enableCarousel && (
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={handleNext}
            aria-label="Next"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="rgb(53, 65, 86)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
