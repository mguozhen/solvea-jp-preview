'use client';

import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

export const Slower = (_: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ins = Lottie.loadAnimation({
      loop: true,
      autoplay: true,
      container: ref.current!,
      path: 'https://cdn.shulex-voc.com/assets/solveaCx/pub/RAD-712_Solvea_dots_animation-650x725_slower_v4.json',
    });
    return () => ins.destroy();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    ></div>
  );
};
