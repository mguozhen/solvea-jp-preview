'use client';

import i18n from '@/i18n';
import cx from 'classnames';
import NumberTicker from 'pages/mod/NumberTicker';
import { useEffect, useRef, useState } from 'react';
import { SLX_HOST } from 'util/services';
import styles from './HeroSection.module.scss';
const StatsContainer = (props: { fromSolveaComparisionHighlight?: boolean }) => {
  const { fromSolveaComparisionHighlight = false } = props;
  const [count, setCount] = useState({
    avgRT: 0,
    open: 0,
    resolved: 0,
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 获取初始数据
    const fetchData = async () => {
      try {
        const response = await fetch(`${SLX_HOST}/api_v2/gpt/transcript/count`, {
          credentials: 'include',
        });
        const data = await response.json();

        // 从本地存储获取缓存值
        const cachedResolved = localStorage.getItem('heroSectionResolved');
        const cachedValue = cachedResolved ? parseInt(cachedResolved, 10) : 0;

        // 使用较大的值
        const maxResolved = Math.max(data.resolved, cachedValue);

        // 先设置数据但不触发动画
        setCount({
          ...data,
          resolved: maxResolved,
        });

        // 更新本地存储
        localStorage.setItem('heroSectionResolved', maxResolved.toString());
      } catch (error) {
        console.error('Failed to fetch count data:', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCount((prevCount) => {
        const increment = Math.floor(Math.random() * 8) + 3; // 3到10之间的随机数
        const newResolved = (isNaN(prevCount.resolved) ? 0 : prevCount.resolved) + increment;

        // 更新本地存储
        localStorage.setItem('heroSectionResolved', newResolved.toString());

        return {
          ...prevCount,
          resolved: newResolved,
        };
      });
    }, 3000);

    // 清理定时器
    return () => clearInterval(interval);
  }, []);

  // 设置Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldAnimate) {
          setShouldAnimate(true);
        }
      },
      { threshold: 1 },
    );

    if (statsContainerRef.current) {
      observer.observe(statsContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldAnimate]);

  return (
    <div
      className={cx(styles.statsContainer, {
        [styles.countWrapperSolveaComparisionHighlight]: fromSolveaComparisionHighlight,
      })}
      ref={statsContainerRef}
    >
      <div className={styles.countWrapper}>
        {!fromSolveaComparisionHighlight && (
          <div className={`${styles.block} ${styles.blocktl}`}></div>
        )}
        <div
          className={cx(styles.statItem, {
            [styles.first]: !fromSolveaComparisionHighlight,
          })}
        >
          <div className={styles.statValue}>
            <NumberTicker value={shouldAnimate ? count.resolved : 0} />
          </div>
          <div className={styles.statLabel}>{i18n('solvea.Home_data_title1')}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>
            <NumberTicker value={shouldAnimate ? count.avgRT / 1000 : 57.5} decimals={1} />s
          </div>
          <div className={styles.statLabel}>{i18n('solvea.Home_data_title2')}</div>
        </div>
        <div
          className={cx(styles.statItem, {
            [styles.last]: !fromSolveaComparisionHighlight,
          })}
        >
          <div className={styles.statValue}>
            <NumberTicker
              value={shouldAnimate ? Math.round((count.resolved / count.open) * 100) || 0 : 0}
            />
            %
          </div>
          <div className={styles.statLabel}>{i18n('solvea.Home_data_title3')}</div>
        </div>
        {!fromSolveaComparisionHighlight && (
          <div className={`${styles.block} ${styles.blockbr}`}></div>
        )}
      </div>
    </div>
  );
};

export default StatsContainer;
