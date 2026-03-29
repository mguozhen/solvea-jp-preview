'use client';

import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import React, { useEffect, useRef, useState } from 'react';
import styles from './BatchAnimation.module.scss';

interface BatchAnimationProps {
  children: React.ReactNode;
  animationType?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  batchId?: string; // 用于标识同一批次的组件
  batchDelay?: number; // 批量动画中每个元素的延迟
}

const BatchAnimation: React.FC<BatchAnimationProps> = ({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  style = {},
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  batchId,
  batchDelay = 100,
}) => {
  const { elementRef, isVisible } = useInViewAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  });

  const [batchVisible, setBatchVisible] = useState(false);
  const batchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 监听全局批量动画事件
  useEffect(() => {
    if (!batchId) return;

    const handleBatchAnimation = (event: CustomEvent) => {
      if (event.detail.batchId === batchId) {
        // 清除之前的定时器
        if (batchTimeoutRef.current) {
          clearTimeout(batchTimeoutRef.current);
        }

        // 根据在批次中的位置设置延迟
        const index = event.detail.index || 0;
        const totalDelay = event.detail.baseDelay + index * batchDelay;

        batchTimeoutRef.current = setTimeout(() => {
          setBatchVisible(true);
        }, totalDelay);
      }
    };

    window.addEventListener('batchAnimation' as any, handleBatchAnimation);

    return () => {
      window.removeEventListener('batchAnimation' as any, handleBatchAnimation);
      if (batchTimeoutRef.current) {
        clearTimeout(batchTimeoutRef.current);
      }
    };
  }, [batchId, batchDelay]);

  const animationClass =
    isVisible || batchVisible
      ? `${styles[animationType]} ${styles.animate}`
      : styles[animationType];

  const inlineStyle = {
    ...style,
    '--animation-duration': `${duration}ms`,
    '--animation-delay': `${delay}ms`,
  } as React.CSSProperties;

  return (
    <div ref={elementRef as any} className={`${animationClass} ${className}`} style={inlineStyle}>
      {children}
    </div>
  );
};

// 批量动画触发器组件
export const BatchAnimationTrigger: React.FC<{
  batchId: string;
  threshold?: number;
  rootMargin?: string;
  baseDelay?: number;
  children: React.ReactNode;
}> = ({ batchId, threshold = 0.1, rootMargin = '0px 0px -50px 0px', baseDelay = 0, children }) => {
  const { elementRef } = useInViewAnimation({
    threshold,
    rootMargin,
    triggerOnce: true,
    delay: 0,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 触发批量动画事件
          const event = new CustomEvent('batchAnimation', {
            detail: {
              batchId,
              baseDelay,
              index: 0,
            },
          });
          window.dispatchEvent(event);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [batchId, threshold, rootMargin, baseDelay]);

  return <div ref={elementRef as any}>{children}</div>;
};

export default BatchAnimation;
