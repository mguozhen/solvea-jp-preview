'use client';

import React, { ReactElement, useEffect, useState } from 'react';

function debounce<T extends (..._args: any[]) => void>(fn: T, ms: number): T {
  let t: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  }) as T;
}

/** 与 layout 内联脚本一致，用于 resize 时更新根字号 */
function getRootFontSize(clientWidth: number): number {
  if (clientWidth >= 1440) return Math.min((clientWidth / 1440) * 16, 18);
  if (clientWidth < 480) return (clientWidth / 375) * 16;
  if (clientWidth < 720) return 8;
  return Math.min((clientWidth / 1440) * 16, 18);
}

export const Responsive = () => {
  useEffect(() => {
    const handleResize = debounce(() => {
      document.documentElement.style.fontSize = `${getRootFontSize(window.innerWidth)}px`;
    }, 60);
    // 仅 resize 时更新，mount 不写 DOM，避免首屏重排跳动
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null;
};

interface HowItWorkProps {
  mobileComponent: ReactElement;
  desktopComponent: ReactElement;
}

export const ResponsiveComponent: React.FC<HowItWorkProps> = ({ mobileComponent: MobileComponent, desktopComponent: DesktopComponent }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    // 初始化检查
    handleResize();

    // 添加事件监听
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile ? MobileComponent : DesktopComponent;
};
