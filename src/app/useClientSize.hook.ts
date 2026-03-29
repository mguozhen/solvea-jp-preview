'use client';

import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export const useClientSize = () => {
  const [clientSize, setClientSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });
  
  useEffect(() => {
    // 首次挂载时更新一次，确保获取正确的尺寸
    setClientSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    
    const handleResize = debounce(() => {
      setClientSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 120);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let fontSize = Math.min(clientSize.width / 1440 * 16, 18);
  if (clientSize.width < 480) {
    fontSize = clientSize.width / 375 * 16;
  }

  return {
    clientSize,
    isMobile: clientSize.width < 480,
    fontSize
  }
};