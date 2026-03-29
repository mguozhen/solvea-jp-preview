import React, { forwardRef, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
// import WordCloud from 'wordcloud';
// import { Button } from 'antd';
// import html2canvas from 'html2canvas';

export interface WordCloudProps {
  className?: string;
  style?: React.CSSProperties;
  handleExport?: (_ref: any) => void;
  data?: Array<{
    word?: string;
    frequency?: number;
  }>;
  options?: {
    fontFamily?: string; // 字体
    minSize?: number; // 最小字体
    clearCanvas?: boolean; // 透明背景
    fontWeight?: 'normal' | 'bold' | number; // 字体粗细
    color?: 'random-dark' | 'random-light' | string; // 字的颜色
    gridSize?: number; // 边距
    shape?:
      | 'circle'
      | 'cardioid'
      | 'diamond'
      | 'square'
      | 'triangle-forward'
      | 'triangle'
      | 'pentagon'
      | 'star'; // 字的形状
    backgroundColor?: string;
  };
}

/**
 * 渲染一个词云图
 */

export default forwardRef<HTMLDivElement, WordCloudProps>(
  function AIWordsWordCloud(props, _ref) {
    const { className, style, data = [], options = {} } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current || !data.length) return;

      // WordCloud(containerRef.current, data, options);
      console.log(
        'WordCloud functionality disabled - wordcloud module not available',
      );
    }, [data, options]);

    return (
      <div
        ref={containerRef}
        className={cx(styles.container, className)}
        style={style}
      >
        <div>WordCloud component not available</div>
      </div>
    );
  },
);
