import React from 'react';
import cx from 'classnames';
import BrandScreen from 'components/BrandScreen';
import styles from './index.module.scss';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  repeat?: number;
}

/**
 * 滚动品牌墙组件
 */
export default function ScrollingBrandWall(props: Props) {
  const { className, style, repeat = 4 } = props;

  // 品牌图片地址
  const brandImages = [
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/abbec0d4-1530-4d17-8959-85217ca9d751.png',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/4dbe2507-cc37-4641-8788-68af599e756a.png',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/0e942cc8-d8f4-4881-b7f3-a4ba283c7959.png',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/a2b48777-f5a9-4fbe-9f27-4fa225bc11db.png',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/c6992883-93df-4cb3-b6b6-0b469c4c52be.png',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/71a5c495-04c2-4f11-8d9b-0d24c98adffc.png?_size=h180%',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/eff869c7-9e46-40f8-8d12-db06cf77ee0b.png?_size=h150%',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/2ec79982-2bd8-43d5-963b-8b8cbe992aa9.png',
    'https://cdn.shulex-voc.com/shulex/upload/2025-07-30/b8e890cd-10d2-4ab1-a922-4652a4b73bf6.png',
  ];

  // 将图片地址转换为React节点
  const brands = brandImages.map((src, index) => {
    const size = src.match(/\?_size=(w([^_]*)_?)?(h([^_]*))?/) || [];
    const width = size[2];
    const height = size[4];

    return <div key={index} className={styles.brandItem}>
      <img src={src} alt={`Brand ${index + 1}`} className={`${styles.brandImage}`} style={{
        width: width ? width : 'auto',
        height: height ? height : 'auto',
        maxHeight: height ? 'none' : '100%',
        maxWidth: width ? 'none' : '100%',
      }} />
    </div>;
  });

  return (
    <div className={cx(styles.container, className)} style={style}>
      <BrandScreen brands={brands} repeat={repeat} />
    </div>
  );
}