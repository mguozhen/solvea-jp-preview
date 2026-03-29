import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import Step from '../Step';

interface StepItem {
  title?: string;
  content?: string;
  href?: string;
  image?: string;
  imageAlt?: string;
}

interface BlogsProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
  steps?: StepItem[];
  theme?: 'dark' | 'light';
  showNumber?: boolean;
}

function StepList(props: {
  steps?: StepItem[];
  showNumber?: boolean;
  theme?: 'dark' | 'light';
}) {
  const { steps = [], showNumber, theme } = props;

  const isEven = steps?.length % 2 === 0;
  return (
    <div
      className={cx(styles.content, {
        [styles.odd]: !isEven,
        [styles.even]: isEven,
      })}
    >
      {Array.isArray(steps) &&
        steps.map((item, index) => {
          return (
            <Step
              theme={theme}
              {...item}
              key={index}
              type={isEven ? 'even' : 'odd'}
              step={index + 1}
              showNumber={showNumber}
            />
          );
        })}
    </div>
  );
}

/**
 * 双数两列，单数三列
 * @param props
 * @returns
 */
export default function Steps(props: BlogsProps) {
  const {
    className,
    style,
    steps,
    title,
    theme = 'light',
    subtitle,
    showNumber,
  } = props;

  return (
    <div
      className={cx(styles.container, className, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
      })}
      style={style}
    >
      {(title || subtitle) && (
        <div className={styles.head}>
          {title && (
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {subtitle && (
            <div
              className={styles.subtitle}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
        </div>
      )}

      <StepList steps={steps} showNumber={showNumber} theme={theme} />
    </div>
  );
}
