'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-web';

export const SolveaLottie = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // 使用 Intersection Observer 实现懒加载
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // 提前 100px 开始加载
        threshold: 0.1,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!ref.current || !shouldLoad) return;

    let animationInstance: any = null;
    let isMounted = true;

    // 延迟加载 Lottie 动画，避免阻塞首屏
    const loadAnimation = async () => {
      try {
        const animationPath = '/RAD-716 Solvea redefines AI support-hero version.json';
          // 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-716_Solvea_redefines_AI_support-hero_version.json';

        const response = await fetch(animationPath);
        const animationData = await response.json();

        if (!isMounted || !ref.current) return;

        animationInstance = Lottie.loadAnimation({
          loop: false,
          autoplay: true,
          container: ref.current,
          animationData: animationData,
          renderer: 'svg',
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            // 渲染优化
            progressiveLoad: true,
            hideOnTransparent: true,
          },
        });

        animationInstance.addEventListener('DOMLoaded', () => {
          if (isMounted) {
            setIsLoaded(true);
          }
        });

        if (animationInstance.isLoaded) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load Lottie animation:', error);
      }
    };

    loadAnimation();

    return () => {
      isMounted = false;
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, [shouldLoad]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: isLoaded ? 'auto' : '200px', // 防止 CLS
        opacity: isLoaded ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in',
      }}
      aria-hidden="true"
    />
  );
};
