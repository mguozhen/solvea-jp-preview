import React from 'react';
import styles from './index.module.scss';

interface Props {
  logo?: any;
  description?: string;
  imgSrc?: string;
}

export default function BrandCard(props: Props) {
  const { logo, description, imgSrc } = props;
  return (
    <div className={styles.container}>
      <div className={styles.logo}>{logo}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.img}>
        <img className={styles.imgInner} src={imgSrc} alt="" />
        {/* <div className={styles.imgg}></div> */}
      </div>
    </div>
  );
}
