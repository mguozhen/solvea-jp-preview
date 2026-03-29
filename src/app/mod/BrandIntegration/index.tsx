import i18n from '@/i18n';
import TextAnimation from 'components/TextAnimation';
import * as logos from 'pages/mod/svgs/logos';
import React from 'react';
import styles from './index.module.scss';

export interface BrandGridProps {
  className?: string;
}

export const BrandGrid: React.FC<BrandGridProps> = ({ className }) => {
  const brands = [
    {
      id: 1,
      logo: logos.Ebay,
      name: 'ebay',
    },
    {
      id: 2,
      logo: logos.Zoho,
      name: 'zoho',
    },
    {
      id: 3,
      logo: logos.Gmail_Logo3,
      name: 'gmail',
    },
    {
      id: 4,
      logo: logos.FreshdeskAr212,
      name: 'freshdesk',
    },
    {
      id: 5,
      logo: null,
    },
    {
      id: 6,
      logo: null,
    },
    {
      id: 7,
      logo: logos.Zendest,
      name: 'zendesk',
    },
    {
      id: 8,
      logo: logos.Tiktok,
      name: 'tiktok',
    },
    {
      id: 9,
      logo: null,
    },
    {
      id: 10,
      logo: logos.OutlookSvgrepoCom1,
      name: 'outlook',
    },
    {
      id: 11,
      logo: null,
    },
    {
      id: 12,
      logo: null,
    },
    {
      id: 13,
      logo: logos.Amazon,
      name: 'amazon',
    },
    {
      id: 14,
      logo: logos.Shopify,
      name: 'shopify',
    },
    {
      id: 15,
      logo: logos.Facebook_Logo_Primary1,
      name: 'facebook',
    },
    {
      id: 16,
      logo: logos.WhatsApp,
      name: 'whatsapp',
    },
    {
      id: 17,
      logo: logos.Facebook_Logo_Primary1,
      name: 'facebook',
    },
    {
      id: 18,
      logo: logos.ServiceNow,
      name: 'servicenow',
    },
    {
      id: 19,
      logo: null,
    },
    {
      id: 20,
      logo: null,
    },
    {
      id: 21,
      logo: null,
    },
    {
      id: 22,
      logo: logos.Instagram_Glyph_Black2,
      name: 'instagram',
    },
    {
      id: 23,
      logo: null,
    },
    {
      id: 24,
      logo: logos.Maskgroup,
      name: 'mask',
    },
    {
      id: 25,
      logo: logos.MicrosoftIcon,
      name: 'microsoft',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <TextAnimation animationType="fadeInUp" delay={0} duration={600}>
          {i18n('solvea.Home_integration')}
        </TextAnimation>
      </div>
      <div className={`${styles.brandGrid} ${className || ''}`}>
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`${styles.brandCard} ${brand.logo ? '' : styles.none} ${brand.name}`}
          >
            {brand.logo ? (
              <brand.logo className={styles.svg} />
            ) : (
              <div className={styles.emptyCard} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.brandGridSvgContainer}>
        <svg
          className={`${styles.brandGridSvg} only-mobile`}
          width="375"
          height="283"
          viewBox="0 0 375 283"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="375"
            y="283.001"
            width="204"
            height="68"
            transform="rotate(180 375 283.001)"
            fill="#F07AF9"
          />
          <rect
            x="94.0029"
            y="141.33"
            width="95.0032"
            height="141.207"
            transform="rotate(180 94.0029 141.33)"
            fill="#F07AF9"
          />
          <rect
            x="248.188"
            y="147.04"
            width="77.0927"
            height="73.4587"
            transform="rotate(180 248.188 147.04)"
            fill="#F07AF9"
          />
          <rect
            x="171.096"
            y="214.789"
            width="77.0927"
            height="73.4587"
            transform="rotate(180 171.096 214.789)"
            fill="#F07AF9"
          />
          <rect
            x="171.096"
            y="73.5815"
            width="77.0927"
            height="73.4587"
            transform="rotate(180 171.096 73.5815)"
            fill="#F07AF9"
          />
          <rect
            x="335"
            y="73.4199"
            width="86.8439"
            height="73.4187"
            transform="rotate(180 335 73.4199)"
            fill="#F07AF9"
          />
        </svg>
        <svg
          className={`${styles.brandGridSvg} only-pc`}
          width="446"
          height="488"
          viewBox="0 0 446 488"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="-77.3379" width="226.78" height="117.639" fill="#F07AF9" />
          <rect x="282.289" y="244.224" width="163.711" height="243.33" fill="#F07AF9" />
          <rect x="16.5938" y="234.384" width="132.847" height="126.585" fill="#F07AF9" />
          <rect x="149.441" y="117.639" width="132.847" height="126.585" fill="#F07AF9" />
          <rect x="149.441" y="360.969" width="132.847" height="126.585" fill="#F07AF9" />
          <rect x="-133" y="361.245" width="149.651" height="126.516" fill="#F07AF9" />
        </svg>
      </div>
    </div>
  );
};

export default BrandGrid;
