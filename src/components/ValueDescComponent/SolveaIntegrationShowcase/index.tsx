import * as logos from 'pages/mod/svgs/logos';
import SolveaButton from '../SolveaButton';
import styles from './index.module.scss';

interface SolveaIntegrationShowcaseProps {
  title: string;
  description: string;
  cardList?: Array<{
    title: string;
    description: string;
  }>;
  button: {
    text: string;
    href: string;
  };
  text?: string;
  img?: string;
}

export default function SolveaIntegrationShowcase(props: SolveaIntegrationShowcaseProps) {
  const { title, description, cardList, button, img, text } = props;

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

  const extraContent = (
    <div className={`${styles.brandGrid} `}>
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
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      <div className={styles.content}>
        {cardList && cardList[0]?.title && (
          <div className={styles.cardList}>
            {cardList.map((card, index) => (
              <div key={index} className={styles.cardItem}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>{card.description}</div>
              </div>
            ))}
          </div>
        )}
        {text && !cardList?.[0]?.title && <div className={styles.cardDescriptionText}>{text}</div>}
        {img ? (
          <img
            src={img}
            alt={title}
            className={styles.img}
            loading="lazy"
            decoding="async"
          />
        ) : (
          extraContent
        )}
      </div>
      <SolveaButton button={button} btnType="whiteBtn" />
    </div>
  );
}
