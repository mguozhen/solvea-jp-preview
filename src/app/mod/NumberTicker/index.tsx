'use client';

import React, { useState, useEffect, useRef } from 'react';

interface NumberTickerProps {
  /**
   * 目标数值
   */
  value: number;
  /**
   * 动画持续时间（毫秒）
   * @default 1000
   */
  duration?: number;
  /**
   * 小数位数
   * @default 0
   */
  decimals?: number;
  /**
   * 数字格式化选项
   */
  formatter?: Intl.NumberFormatOptions;
  /**
   * 语言环境
   * @default 'en-US'
   */
  locale?: string;
}

const NumberTicker: React.FC<NumberTickerProps> = ({
                                                     value,
                                                     duration = 500,
                                                     decimals = 0,
                                                     formatter = {},
                                                     locale = 'en-US',
                                                   }) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const previousValueRef = useRef<number>(0);

  // 格式化数字显示
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      ...formatter,
    }).format(num);
  };

  // 执行动画
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // 使用缓动函数使动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    const newValue = previousValueRef.current +
      (value - previousValueRef.current) * easeOutQuart;

    setCurrentValue(newValue);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // 监听 value 变化并触发动画
  useEffect(() => {
    // 取消之前的动画
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // 保存当前值作为起始值
    previousValueRef.current = currentValue;
    startTimeRef.current = 0;

    // 启动新动画
    animationRef.current = requestAnimationFrame(animate);

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, decimals]);

  return <>{formatNumber(currentValue)}</>;
};

export default NumberTicker;
