import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { brandImageList } from '@/constant/common';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function BrandCarousel(_props: PropsWithChildren<Props>) {

  const data = brandImageList;

  return (
    <div className={styles.box}>
      {[1, 2].map((_, tIndex) => {
        return (
          <div className={cx(styles.carouselItem)} key={tIndex}>
            {data?.map((item, itemIndex) => {
              return (
                <div key={itemIndex} className={styles.boxItem}>
                  <img src={item} className={styles.imgItem} alt="brand" />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
