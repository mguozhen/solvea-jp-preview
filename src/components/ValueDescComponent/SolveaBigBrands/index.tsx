import React from 'react';
import styles from './index.module.scss';
import { brandImageList } from '@/constant/common';
import BrandWall from 'components/BrandWall';

interface Props {
  className?: string;
  title?: string;
  titleColor?: string;
  backgroundColor?: string;
}

export default function SolveaBigBrands(props: Props) {
  const { title, titleColor } = props;
  return (
    <div className={styles.container}>
      <BrandWall
        title={title ?? ''}
        titleColor={titleColor}
        data={brandImageList}
        className={styles.brandWall}
      />
    </div>
  );
}
