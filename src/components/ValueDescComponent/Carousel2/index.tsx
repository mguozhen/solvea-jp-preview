'use client';

import type { CarouselRef } from 'antd/es/carousel';
import Carousel from 'antd/es/carousel';
import { useMemo, useRef, useState, type CSSProperties, type MutableRefObject } from 'react';
import PartLabel from '../PartLabel';
import styles from './index.module.scss';

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

interface Props {
  partLabel?: string;
  title?: string;
  description?: string;
  navigationPalce?: 'bottom' | 'left';
  carouselPadding?: string;
  navigationPadding?: string;
  items: CarouselItem[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
  className?: string;
}

export default function Carousel2(props: Props) {
  const {
    partLabel = '',
    title = '',
    description = '',
    navigationPalce = 'left',
    carouselPadding = '0px 0px',
    navigationPadding = '0px 0px',
    items = [],
    autoplay = true,
    autoplaySpeed = 0,
    speed = 0,
  } = props;

  // 独立管理两处轮播（移动端 bottom 布局与桌面端 left 布局），避免复用同一节点导致 ref 指向被覆盖
  const bottomCarouselRef = useRef<CarouselRef>(null);
  const leftCarouselRef = useRef<CarouselRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 切换到指定索引
  const handleGoTo = (index: number) => {
    setCurrentIndex(index); // 立即同步导航态，避免 afterChange 未触发时无反馈
    bottomCarouselRef.current?.goTo(index);
    leftCarouselRef.current?.goTo(index);
  };

  // 轮播切换时的回调
  const handleAfterChange = (current: number) => {
    setCurrentIndex(current);
  };

  // 判断是否应该启用轮播
  const enableCarousel = items.length > 1 && autoplay && autoplaySpeed > 0;

  const BgSvg = ({ className }: { className?: string }) => {
    return (
      <svg
        preserveAspectRatio={'xMidYMid slice'}
        className={className}
        width="1440"
        height="1027"
        viewBox="0 0 1440 1027"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="107.822" x2="1440" y2="107.822" stroke="#CACAB9" strokeWidth="0.355711" />
        <line x1="739.178" x2="739.178" y2="963" stroke="#CACAB9" strokeWidth="0.355711" />
        <line
          x1="1361.18"
          y1="-7.77431e-09"
          x2="1361.18"
          y2="1027"
          stroke="#CACAB9"
          strokeWidth="0.355711"
        />
        <line
          x1="0.000123511"
          y1="511.822"
          x2="1440"
          y2="512.822"
          stroke="#CACAB9"
          strokeWidth="0.355711"
        />
        <line y1="82.8221" x2="1440" y2="82.8221" stroke="#CACAB9" strokeWidth="0.355711" />
        <path
          d="M389.797 767.869H395.06V770.699H389.797V775.963H386.967V770.699H381.703V767.869H386.967V762.605H389.797V767.869Z"
          fill="#EEEEE6"
        />
        <path
          d="M740.094 510.264H745.357V513.094H740.094V518.357H737.264V513.094H732V510.264H737.264V505H740.094V510.264Z"
          fill="#3D3D3D"
        />
        <path
          d="M779.969 726.264H785.232V729.094H779.969V734.357H777.139V729.094H771.875V726.264H777.139V721H779.969V726.264Z"
          fill="#EEEEE6"
        />
        <path
          d="M1362.09 930.264H1367.36V933.094H1362.09V938.357H1359.26V933.094H1354V930.264H1359.26V925H1362.09V930.264Z"
          fill="#2B2B2B"
        />
        <path
          d="M1053.52 806.537H1058.78V809.367H1053.52V814.631H1050.69V809.367H1045.42V806.537H1050.69V801.273H1053.52V806.537Z"
          fill="#EEEEE6"
        />
        <rect x="1419" y="93" width="17" height="51" fill="#F07AF9" />
      </svg>
    );
  };

  const HeaderNode = (
    <div className={styles.titleContainer}>
      <PartLabel partLabel={partLabel} className={styles.partLabel} />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );

  const renderCarousel = (ref: MutableRefObject<CarouselRef | null>) => (
    <div className={styles.carouselWrapper}>
      <BgSvg className={styles.bgSvg} />
      <div className={styles.carousel} style={{ padding: carouselPadding }}>
        <Carousel
          ref={ref}
          autoplay={enableCarousel}
          autoplaySpeed={autoplaySpeed}
          speed={speed}
          dots={false}
          infinite={enableCarousel}
          slidesToShow={1}
          slidesToScroll={1}
          afterChange={handleAfterChange}
        >
          {items.map((item, index) => (
            <div key={index} className={styles.slideWrapper}>
              <img
                src={item.image}
                alt={item.description}
                className={styles.image}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );

  const currentDes = useMemo(() => items?.[currentIndex]?.description, [currentIndex, items]);

  return (
    <div
      className={`${styles.container} ${
        navigationPalce === 'bottom' ? styles.bottomLayout : styles.leftLayout
      }`}
    >
      {/* 标题容器 */}
      {HeaderNode}

      {/* Bottom布局 - 小屏幕时强制显示，大屏幕时当navigationPalce为bottom时显示 */}
      <div className={styles.carouselContainer}>{renderCarousel(bottomCarouselRef)}</div>
      <div style={{ padding: navigationPadding }}>
        {items.length > 0 && (
          <div className={styles.navigationBottom}>
            {items.map((item, index) => (
              <div
                key={index}
                className={`${styles.navItem} ${currentIndex === index ? styles.active : ''}`}
                onClick={() => handleGoTo(index)}
                style={{ '--animation-duration': `${autoplaySpeed}ms` } as CSSProperties}
              >
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Left布局容器 - 大屏幕时当navigationPalce为left时显示，小屏幕时隐藏 */}
      {navigationPalce === 'left' && (
        <div className={styles.carouselLeftContainer}>
          {items.length > 0 && (
            <div className={styles.navigationLeft} style={{ padding: navigationPadding }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.navItem} ${currentIndex === index ? styles.active : ''}`}
                  onClick={() => handleGoTo(index)}
                  style={{ '--animation-duration': `${autoplaySpeed}ms` } as CSSProperties}
                >
                  <div className={styles.title}>{item.title}</div>
                </div>
              ))}
            </div>
          )}
          <div className={styles.rightBox}>
            <div className={styles.description}>{currentDes}</div>
            <div>{renderCarousel(leftCarouselRef)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
