import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';
import SvgCheckGreen from 'components/Icons/CheckGreen';
import SvgCheckFalse from 'components/Icons/CheckFalse';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subTitle?: string;
  theme?: 'dark' | 'light';
  headerList?: { feature?: string; brands?: string[] | string };
  contentList: {
    feature?: string;
    contents?:
      | {
          get?: any;
          text?: string;
        }[]
      | string;
  }[];
  maxItem?: boolean;
  featureClassName?: string;
}

export default function Compare(props: Props) {
  const {
    className,
    style,
    title,
    subTitle,
    headerList = {},
    contentList,
    maxItem,
    featureClassName,
    theme = 'light',
  } = props;
  const { brands } = headerList;
  let curBrands = undefined;
  if (brands) {
    curBrands = Array.isArray(brands) ? brands : JSON.parse(brands);
  }

  return (
    <div
      className={cx(styles.container, className, {
        [styles.light]: theme === 'light',
        [styles.dark]: theme === 'dark',
      })}
      style={style}
    >
      {(title || subTitle) && (
        <div className={styles.head}>
          {title && (
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: title.replace(/\n/g, '<br/>'),
              }}
            />
          )}
          {subTitle && (
            <div
              className={styles.subTitle}
              dangerouslySetInnerHTML={{
                __html: subTitle.replace(/\n/g, '<br/>'),
              }}
            />
          )}
        </div>
      )}
      <div className={styles.table}>
        {curBrands && (
          <div className={cx(styles.tableItem, styles.header)}>
            <div className={cx(styles.feature, featureClassName)}>
              {headerList?.feature}
            </div>
            {Array.isArray(curBrands) &&
              (curBrands as any[]).map((item) => {
                return (
                  <div
                    className={styles.item}
                    key={item}
                    style={maxItem ? { maxWidth: 'max-content' } : {}}
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        )}

        {Array.isArray(contentList) &&
          contentList.map((contentItem, index) => {
            const contents = Array.isArray(contentItem?.contents)
              ? contentItem?.contents
              : JSON.parse(contentItem?.contents || '');
            return (
              <div
                className={cx(styles.tableItem, {
                  [styles.gray]: index % 2 === 0,
                })}
                key={'content' + index}
              >
                <div className={cx(styles.feature, featureClassName)}>
                  {contentItem?.feature}
                </div>
                {Array.isArray(contents) &&
                  contents.map((item, idx) => {
                    return (
                      <div
                        className={styles.item}
                        style={maxItem ? { maxWidth: 'max-content' } : {}}
                        key={'content-item' + idx}
                      >
                        {(item.get === true || item.get === 'true') && (
                          <SvgCheckGreen className={styles.icon} />
                        )}
                        {(item.get === false || item.get === 'false') && (
                          <SvgCheckFalse className={styles.icon} />
                        )}
                        {item.text && (
                          <span
                            className={styles.text}
                            dangerouslySetInnerHTML={{
                              __html: item.text.replace(/\n/g, '<br/>'),
                            }}
                          ></span>
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
