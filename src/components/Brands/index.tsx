import React from 'react';
import cx from 'classnames';
import BrandScreen from 'components/BrandScreen';
import styles from './index.module.scss';

interface Props extends BaseCSSProps {
  title?: string;
  theme?: 'dark' | 'light';
  itemClassName?: string;
  brands?: Array<{
    src?: string;
    alt?: string;
  }>;
}

/**
 * logo图片为白色 不适用白色背景的页面
 * @param props
 * @returns
 */
export default function Brands(props: Props) {
  const {
    title,
    theme = 'light',
    className,
    style,
    brands,
    itemClassName,
  } = props;
  const finalBrands = Array.isArray(brands)
    ? brands?.map((item, i) => {
        return (
          <div key={i} className={cx(styles.iconItem, itemClassName)}>
            <img src={item?.src} alt={item?.alt} />
          </div>
        );
      })
    : [
        <div key="anker" className={cx(styles.iconItem, styles.iconAnker)}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/Anker.svg"
            alt="Anker"
            title="Anker"
          />
        </div>,
        <div key="pg" className={cx(styles.iconItem, styles.iconPg)}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/P&G.svg"
            alt="P&G"
            title="P&G"
          />
        </div>,
        <div key="worthfind" className={cx(styles.iconItem, styles.iconWorthfind)}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/Worthfind.svg"
            alt="CHI FOREST"
            title="CHI FOREST"
          />
        </div>,
        <div key="chi" className={styles.iconItem}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/chi.svg"
            alt="CHI FOREST"
            title="CHI FOREST"
          />
        </div>,
        <div key="openai" className={cx(styles.iconItem, styles.iconOpenAI)}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/OpenAI.svg"
            alt="OpenAI"
            title="OpenAI"
          />
        </div>,
        <div key="shopify" className={cx(styles.iconItem, styles.iconShopify)}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/shopify.svg"
            alt="Shopify"
            title="Shopify"
          />
        </div>,
        <div key="trustpilot" className={styles.iconItem}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/trustpilot.svg"
            alt="TrustPilot"
            title="TrustPilot"
          />
        </div>,
        <div key="amazon" className={cx(styles.iconItem, styles.iconAmazon)}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/amazon.svg"
            alt="Amazon"
            title="Amazon"
          />
        </div>,
        <div key="miracle-vet" className={styles.iconItem}>
          <img
            src="https://cdn.shulex-voc.com/assets/voc/miracle-vet.svg"
            alt="Miracle Vet"
            title="Miracle Vet"
          />
        </div>,
      ];
  return (
    <div
      className={cx(styles.allTrust, className, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
      })}
      style={style}
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.iconBox}>
        <BrandScreen brands={finalBrands} />
      </div>
    </div>
  );
}
