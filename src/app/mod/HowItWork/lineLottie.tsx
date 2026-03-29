'use client';

import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

interface LineLottieProps {
  className?: string;
  viewport?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const LineLottie = ({ className, viewport }: LineLottieProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ins = Lottie.loadAnimation({
      loop: true,
      autoplay: true,
      container: ref.current,
      path: '/line-loading.json',
      renderer: 'svg',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true,
      },
    });

    // 如果指定了viewport，设置裁剪区域
    if (viewport && ins) {
      const svgElement = ref.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.clipPath = `inset(${viewport.y}px ${
          viewport.x + viewport.width
        }px ${viewport.y + viewport.height}px ${viewport.x}px)`;
      }
    }

    return () => ins.destroy();
  }, [viewport]);

  return <div ref={ref} className={className}></div>;
};
