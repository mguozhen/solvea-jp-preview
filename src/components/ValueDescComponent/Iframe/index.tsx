import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  src?: string;
  followContent?: boolean;
}

export default function IFrame(props: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(500);
  const { className, style, title, src, followContent } = props;
  useEffect(() => {
    if (!ref.current || !followContent) {
      return;
    }
    const handler = (_e) => {
      setHeight(window.innerHeight);
    };
    ref.current?.contentWindow?.addEventListener('resize', handler);
    return () => {
      ref.current?.contentWindow?.addEventListener('resize', handler);
    };
  }, [ref, followContent]);
  return (
    <div className={cx(styles.container, className)} style={style}>
      {title && <h2 className={styles.h2}>{title}</h2>}
      <div>
        <iframe
          ref={ref}
          className={styles.ifm}
          style={followContent ? { height } : undefined}
          src={src}
          frameBorder="none"
        />
      </div>
    </div>
  );
}
