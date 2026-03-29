import React, {
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  ReactNode,
} from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { isNil } from 'lodash';
import useResizeObserver from '@react-hook/resize-observer';
export interface Props extends BaseCSSProps {
  tabs?: PropsWithChildren<{
    label?: React.ReactNode;
    key: string | number;
    noSwitch?: boolean;
    tabClass?: string;
    children?: ReactNode;
    imgChildren?: string;
  }>[];
  childrenMaxWidth?: number; // 图片最大宽度
  childrenScale?: string; // 图片的宽/高的比例 用于在图片未加载时填充高度防止抖动 百分比
  onChange?: (_key?: any) => void;
  tabClass?: string;
  wrapperClassName?: string;
  slideBlockClassName?: string;
  defaultActiveKey?: string | number;
  onTabClick?: () => void;
  hasInfoComponent?: boolean;
  needTagList?: boolean;
  title?: string;
  theme?: 'dark' | 'light';
}

export default function EnTabs(props: Props) {
  const {
    className,
    wrapperClassName,
    style,
    tabs,
    defaultActiveKey,
    onChange,
    onTabClick,
    tabClass,
    slideBlockClassName,
    hasInfoComponent,
    title,
    childrenMaxWidth,
    childrenScale,
    theme = 'light',
  } = props;
  const slideRef = useRef<HTMLDivElement>(null);
  const currentSelectedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // 当前选中tab的key
  const [curSelectedKey, setCurSelectedKey] = useState<string | number>(
    isNil(defaultActiveKey) ? 0 : defaultActiveKey,
  );

  // 监听当前选中Tab宽度变化，调整滑块大小
  useResizeObserver(currentSelectedRef, () => {
    const width = currentSelectedRef?.current?.offsetWidth;
    const left = currentSelectedRef?.current?.offsetLeft;
    const height = currentSelectedRef?.current?.offsetHeight;
    if (slideRef.current && left != null && width != null && height != null) {
      slideRef.current.style.left = left + 'px';
      slideRef.current.style.width = width + 'px';
      slideRef.current.style.height = height - 8 + 'px';
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    const target = currentSelectedRef.current;
    if (container && target) {
      const containerWidth = container.offsetWidth;
      const targetWidth = target.offsetWidth;
      const targetLeft = target.offsetLeft;
      const scrollLeft = targetLeft - (containerWidth - targetWidth) / 2;
      container.scrollLeft = scrollLeft;
      if (slideRef.current) {
        slideRef.current.style.left = targetLeft + 'px';
        slideRef.current.style.width = targetWidth + 'px';
      }
    }
  }, [currentSelectedRef?.current, curSelectedKey]);

  useEffect(() => {
    if (currentSelectedRef?.current) {
      const { offsetLeft, offsetWidth, offsetHeight } =
        currentSelectedRef.current;
      if (slideRef.current) {
        slideRef.current.style.left = offsetLeft + 'px';
        slideRef.current.style.width = offsetWidth + 'px';
        slideRef.current.style.height = offsetHeight - 8 + 'px';
      }
    }
  }, []);

  return (
    <div
      className={cx(styles.container, className, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
      })}
      style={style}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      <div
        className={cx(styles.tabs, wrapperClassName, {
          [styles.none]: tabs?.length && tabs?.length <= 1,
        })}
        data-aos="fade-up"
        ref={containerRef}
      >
        {Array.isArray(tabs) &&
          tabs.map((tab, index) => {
            const key = tab?.key || index;
            return (
              <div
                className={cx(styles.tab, tabClass, tab.tabClass, {
                  [styles.tabSelected]: key === curSelectedKey,
                })}
                key={key}
                ref={curSelectedKey === key ? currentSelectedRef : undefined}
                onClick={(_e) => {
                  if (!tab.noSwitch) {
                    setCurSelectedKey(key);
                  }
                  if (onChange) onChange(key);
                  if (onTabClick) onTabClick();
                }}
              >
                {tab.label}
              </div>
            );
          })}
        <div
          className={cx(styles.slideBlock, slideBlockClassName)}
          ref={slideRef}
        ></div>
      </div>
      <div className={styles.content}>
        {hasInfoComponent
          ? null
          : (Array.isArray(tabs) &&
              tabs?.find((i, index) => (i?.key || index) === curSelectedKey)
                ?.children) || (
              <div
                className={styles.tabChildren}
                style={{
                  maxWidth: +(childrenMaxWidth || 0),
                }}
              >
                <div
                  className={styles.children}
                  style={{
                    paddingTop: childrenScale,
                  }}
                >
                  <img
                    className={styles.img}
                    style={{
                      maxWidth: +(childrenMaxWidth || 0),
                    }}
                    src={
                      tabs?.find(
                        (i, index) => (i?.key || index) === curSelectedKey,
                      )?.imgChildren
                    }
                  />
                </div>
              </div>
            )}
      </div>
    </div>
  );
}
