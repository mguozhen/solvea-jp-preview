'use client';

import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import React from 'react';
import styles from './WithAnimation.module.scss';

interface WithAnimationProps {
  children: React.ReactNode;
  animationType?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  playImmediately?: boolean;
}

const WithAnimation: React.FC<WithAnimationProps> = ({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  style = {},
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  playImmediately = false,
}) => {
  const { elementRef, isVisible } = useInViewAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  });

  const shouldAnimate = playImmediately || isVisible;
  const animationClass = shouldAnimate
    ? `${styles[animationType]} ${styles.animate}`
    : styles[animationType];

  const inlineStyle = {
    ...style,
    '--animation-duration': `${duration}ms`,
    '--animation-delay': `${delay}ms`,
  } as React.CSSProperties;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${animationClass} ${className}`}
      style={inlineStyle}
    >
      {children}
    </div>
  );
};

export default WithAnimation;
