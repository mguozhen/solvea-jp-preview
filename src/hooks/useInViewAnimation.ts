'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useInViewAnimation = (options: UseInViewAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // 添加延迟
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }, delay);
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [delay, triggerOnce]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 如果已经动画过且设置为只触发一次，则不再观察
    if (hasAnimated && triggerOnce) return;

    // 检查浏览器是否支持 IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // 如果不支持，直接显示元素
      setIsVisible(true);
      if (triggerOnce) {
        setHasAnimated(true);
      }
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated, handleIntersection]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    elementRef,
    isVisible,
    hasAnimated
  };
};
