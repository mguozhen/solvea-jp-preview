'use client';

import { useInViewAnimation } from '@/hooks/useInViewAnimation';
import React from 'react';
import styles from './TextAnimation.module.scss';

interface TextAnimationProps {
  children: React.ReactNode;
  animationType?:
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'fadeIn'
    | 'typewriter';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: keyof React.ReactHTML;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  style = {},
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  as: Component = 'div',
}) => {
  const { elementRef, isVisible } = useInViewAnimation({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  });

  const animationClass = isVisible
    ? `${styles[animationType]} ${styles.animate}`
    : styles[animationType];

  const inlineStyle = {
    ...style,
    '--animation-duration': `${duration}ms`,
    '--animation-delay': `${delay}ms`,
  } as React.CSSProperties;

  return React.createElement(
    Component,
    {
      ref: elementRef as React.Ref<any>,
      className: `${animationClass} ${className}`,
      style: inlineStyle,
    },
    children,
  );
};

export default TextAnimation;
