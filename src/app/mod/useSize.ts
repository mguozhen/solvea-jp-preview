'use client'

import { useEffect, useState } from 'react';
import { useSize as _useSize } from 'ahooks';

export const useSize = () => {
  const size = _useSize(document.body);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile((size?.width || 0) < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [size]);

  useEffect(() => {
    if (!size?.width) return;
    const baseWidth = isMobile ? 375 : 1440;
    document.documentElement.style.fontSize = `${
      (size.width / baseWidth) * 16
    }px`;
  }, [size, isMobile]);

  return {
    size,
    isMobile,
  }
}