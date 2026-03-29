'use client';

import React, { useState, useRef } from 'react';
import styles from './index.module.scss';

interface HoverTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const HoverText: React.FC<HoverTextProps> = ({
  children,
  className = '',
  as: Component = 'div',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<any>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const ComponentProps = {
    ref: containerRef,
    className: `${styles.hoverTextContainer} ${className}`,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <Component {...(ComponentProps as any)}>
      <div
        className={`${styles.textLayer} ${styles.originalText} ${
          isHovered ? styles.hidden : styles.visible
        }`}
      >
        {children}
      </div>
      <div
        className={`${styles.textLayer} ${styles.hoverText} ${
          isHovered ? styles.visible : styles.hidden
        }`}
      >
        {children}
      </div>
    </Component>
  );
};

export default HoverText;
