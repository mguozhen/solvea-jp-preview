// import SvgNavVoc from 'components/Icons/NavVoc';
import styles from './index.module.scss';
// import SvgNavChatbot from 'components/Icons/NavChatbot';
import { NavData } from '.';
// import { addToChrome } from '@/constant/extension';
// import SvgChrome from 'components/Icons/Chrome';
// import SvgSearchOutlined from 'components/Icons/SearchOutlined';
import i18n, { useI18n } from '@/i18n';
import {
  ECommerceIndustry,
  FinanceIndustry,
  HealthCareIndustry,
  MobilityIndustry,
  TechnologyIndustry,
} from 'components/Icons';
import { getLink } from 'util/getLink';

export default function () {
  useI18n();

  const solutionOptions: NavData[] = [
    {
      name: i18n('layout.Industry_InformationTechnologyIndustry'),
      logo: (
        <div className={styles.iconContainer}>
          <HealthCareIndustry className={styles.icon} />
        </div>
      ),
      children: [
        {
          name: i18n('layout.Industry_SoftwareServices'),
          href: getLink('/solutions/software-services'),
        },
      ],
    },
    {
      name: i18n('layout.Industry_LifeSciencesHealthcare'),
      logo: (
        <div className={styles.iconContainer}>
          <TechnologyIndustry className={styles.icon} />
        </div>
      ),
      children: [
        {
          name: i18n('layout.Medical_Services'),
          href: getLink('/solutions/medical-services'),
        },
        {
          name: i18n('layout.Pharmaceutical_Equipment_Mfg'),
          href: getLink('/solutions/equipment-manufacturing'),
        },
      ],
    },
    {
      name: i18n('layout.Industry_Mobility'),
      logo: (
        <div className={styles.iconContainer}>
          <MobilityIndustry className={styles.icon} />
        </div>
      ),
      children: [
        {
          name: i18n('layout.Short_distance_Travel'),
          href: getLink('/solutions/short-distance-travel'),
        },
        {
          name: i18n('layout.Automobile_Manufacturing'),
          href: getLink('/solutions/automobile-manufacturing'),
        },
        {
          name: i18n('layout.Auto_Parts_Modification'),
          href: getLink('/solutions/auto-parts-and-modification'),
        },
      ],
    },
    {
      name: i18n('layout.Industry_ECommerce'),
      logo: (
        <div className={styles.iconContainer}>
          <ECommerceIndustry className={styles.icon} />
        </div>
      ),
      children: [
        {
          name: i18n('layout.Furniture_Home_Furnishings'),
          href: getLink('/solutions/furniture-and-home-furnishings'),
        },
        {
          name: i18n('layout.Consumer_Electronics'),
          href: getLink('/solutions/consumer-electronics'),
        },
      ],
    },
    {
      name: i18n('layout.Finance_Industry'),
      logo: (
        <div className={styles.iconContainer}>
          <FinanceIndustry className={styles.icon} />
        </div>
      ),
      children: [
        {
          name: i18n('layout.Banking_key'),
          href: getLink('/solutions/banking'),
        },
        {
          name: i18n('layout.Insurance_key'),
          href: getLink('/solutions/insurance'),
        },
      ],
    },
  ];

  return [
    { name: i18n('layout.Home_Nav_home'), href: getLink('/'), target: '_self' },
    {
      name: i18n('layout.Home_Nav_Solutions'),
      children: solutionOptions,
      column: 3,
    },
    {
      name: i18n('layout.Home_Nav_Customer_Stories'),
      href: getLink('/customer-stories'),
    },
    {
      name: i18n('layout.Blog_Nav'),
      href: '/blog',
      key: 'blog',
    }, // 除英文其他博客还没有，先都指向英文的
    { name: i18n('layout.Pricing_Name'), href: getLink('/pricing') },
    { name: i18n('layout.Home_Navcontact'), href: getLink('/contact') },
  ];
}
