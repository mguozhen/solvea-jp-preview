import i18n from '@/i18n';

export function getPricingData() {
  return [
    {
      key: 'free',
      title: i18n('price.package_free_title2'),
      subTitle: i18n('price.package_free_desc'),
      creditsFixed: 2000,
      basicFeatures: [
        i18n('price.package_common_feature_agent', { count: '3' }),
        i18n('price.package_common_feature_kb', { count: '50' }),
      ],
      moreFeatures: [
        i18n('price.package_free_feature_3'),
        i18n('price.package_free_feature_4'),
        i18n('price.package_free_feature_5'),
        i18n('price.package_free_feature_8'),
        i18n('price.package_free_feature_6'),
        i18n('price.package_free_feature_7'),
      ],
    },
    {
      key: 'basic',
      title: i18n('price.package_basic_title'),
      subTitle: i18n('price.package_basic_desc'),
      creditsList: [],
      basicFeatures: [
        i18n('price.package_common_feature_agent', { count: '10' }),
        i18n('price.package_common_feature_kb', { count: '500' }),
      ],
      moreFeatures: [
        i18n('price.package_free_feature_3'),
        i18n('price.package_free_feature_4'),
        i18n('price.package_free_feature_5'),
        i18n('price.package_free_feature_8'),
        i18n('price.package_free_feature_6'),
        i18n('price.package_free_feature_7'),
      ],
      // otherVersionConfig: [
      //   {
      //     key: 'pro',
      //     title: i18n('price.package_pro_title'),
      //     subTitle: i18n('price.package_basic_desc'),
      //   },
      //   {
      //     key: 'plus',
      //     title: i18n('price.package_plus_title'),
      //     subTitle: i18n('price.package_basic_desc'),
      //   },
      // ],
    },
    // {
    //   key: 'enterprise',
    //   title: i18n('price.package_ent_title'),
    //   subTitle: i18n('price.package_ent_desc'),
    //   price: undefined,
    //   creditsText: i18n('price.package_ent_credit'),
    //   basicFeatures: [
    //     i18n('price.package_ent_feature_1'),
    //     i18n('price.package_ent_feature_2'),
    //     i18n('price.package_ent_feature_3'),
    //     i18n('price.package_ent_feature_4'),
    //     i18n('price.package_ent_feature_7'),
    //   ],
    //   moreFeatures: [
    //     i18n('price.package_ent_feature_5'),
    //     i18n('price.package_ent_feature_6'),
    //     i18n('price.package_ent_feature_8'),
    //     i18n('price.package_ent_feature_9'),
    //   ],
    // },
  ];
}

/** @deprecated Use getPricingData() instead */
export const PRICING_DATA = getPricingData();
