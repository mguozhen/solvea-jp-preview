import i18n from '@/i18n';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import cx from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { IPackageItem, PayDateType, PricingPlanItem, Subscription } from '../../interface';
import PopoverSelect from '../PopoverSelect';
import { formatPrice, getVersionKeyByPackageCode } from './format';
import styles from './index.module.scss';

interface Props {
  data: PricingPlanItem;
  billCycleSelected: PayDateType;
  currentSubscription?: Subscription;
  jumpLink: string;
}

function toKText(num?: number) {
  if (typeof num !== 'number') {
    return undefined;
  }

  return `${num / 1000}K`;
}

export default function PackageItem(props: Props) {
  const { data, billCycleSelected, jumpLink } = props;
  // 选中的完整套餐，初始值取 creditsList[0]，保证 SSR 时能渲染真实价格
  const [curProductPlan, setCurProductPlan] = useState<IPackageItem | undefined>(data?.creditsList?.[0]);

  // 价格
  const priceBox = useMemo(() => {
    if (data?.key === 'enterprise') {
      return <div className={styles.priceText}>{i18n('price.package_custom')}</div>;
    }

    return (
      <div className={styles.priceNormal}>
        <div className={styles.priceNum}>
          ${formatPrice(data?.price ?? curProductPlan?.discountedPrice)}
        </div>
        <div className={styles.priceUnit}>
          /{billCycleSelected === 'monthly' ? i18n('price.month') : i18n('price.year')}
        </div>
      </div>
    );
  }, [data, curProductPlan, billCycleSelected]);

  // 配额
  const creditsBox = useMemo(() => {
    if (data?.creditsFixed) {
      return (
        <div className={cx(styles.creditsBoxBasic, styles.creditsBox)}>
          {toKText(data?.creditsFixed)} {i18n('price.credits')}/{i18n('price.month')}
        </div>
      );
    }

    // 只有选项超过一个时才展示下拉框
    const creditsListMore1 = (data?.creditsList?.length ?? 0) > 1;

    if ((data?.creditsList?.length ?? 0) > 0) {
      const triggerContent = (
        <div
          className={cx(
            styles.creditsBoxBasic,
            styles.creditsBox,
            creditsListMore1 && styles.creditsSelect,
          )}
        >
          {toKText(curProductPlan?.credit)} {i18n('price.credits')}/{i18n('price.month')}
          {creditsListMore1 && <DownOutlined className={styles.downIcon} />}
        </div>
      );
      if (creditsListMore1) {
        return (
          <PopoverSelect
            options={data?.creditsList?.map((item: any) => {
              return {
                label: `${toKText(item?.credit)} ${i18n('price.credits')}/${i18n('price.month')}`,
                value: item?.productPlanId,
                data: item,
              };
            })}
            onClick={(_, item) => {
              setCurProductPlan(item?.data);
            }}
            placement="bottom"
          >
            {triggerContent}
          </PopoverSelect>
        );
      }
      return triggerContent;
    }

    if (data?.creditsText) {
      return (
        <div className={cx(styles.creditsBoxBasic, styles.creditsBox)}>{data?.creditsText}</div>
      );
    }

    return <div className={styles.creditsBoxBasic}></div>;
  }, [data, curProductPlan]);

  // 当前价格（用于决定展示 free 还是 upgrade 按钮）；接口中 price 为 string
  const currentPriceRaw =
    data?.key === 'enterprise' ? undefined : data?.price ?? curProductPlan?.discountedPrice;
  const isFreePrice = data?.key !== 'enterprise' && Number(currentPriceRaw ?? 0) === 0;

  // 按钮区
  const opeationButton = useMemo(() => {
    // 按钮组
    const upgradeBtn = (
      <a className={styles.upgradeBtn} href={jumpLink}>
        {i18n('price.btn_upgrade')}
      </a>
    );

    const freeBtn = (
      <a className={styles.upgradeBtn} href={jumpLink}>
        {i18n('price.btn_start_free')}
      </a>
    );

    const entBtn = (
      <a className={styles.entBtn} href="https://solvea.cx/contact">
        {i18n('price.package_ent_price')}
      </a>
    );

    // 升级到企业版
    if (data?.key === 'enterprise') {
      return entBtn;
    }

    // 当前价格为 0 展示 freeBtn，否则展示 upgradeBtn
    if (isFreePrice) {
      return freeBtn;
    }

    return upgradeBtn;
  }, [data, curProductPlan, isFreePrice, jumpLink]);

  useEffect(() => {
    if (data) {
      setCurProductPlan(data?.creditsList?.[0]);
    }
  }, [billCycleSelected, data]);

  // 根据当前选中的套餐（下拉）决定展示的权益：有 otherVersionConfig 且选中对应版本时用该版本权益，否则用主配置 basicFeatures
  const displayedBasicFeatures = useMemo(() => {
    const list = data?.otherVersionConfig;
    if (!list?.length || !curProductPlan?.productType) {
      return data?.basicFeatures ?? [];
    }
    const match = list.find((c: any) => c.key === curProductPlan?.productType);
    return match?.basicFeatures ?? data?.basicFeatures ?? [];
  }, [data?.basicFeatures, data?.otherVersionConfig, curProductPlan?.productType]);

  // 根据当前选中的套餐（下拉）决定展示的 title/subTitle：当前选中的 code 命中 PACKAGE_CODE_VERSION_MAP 时按对应版本展示，否则按 productType 匹配 otherVersionConfig，都没有则用主配置
  const displayedTitle = useMemo(() => {
    const list = data?.otherVersionConfig;
    if (!list?.length || !curProductPlan) {
      return data?.title ?? '';
    }
    const versionKey =
      getVersionKeyByPackageCode(curProductPlan?.code) ?? curProductPlan?.productType;
    const match = versionKey ? list.find((c) => c.key === versionKey) : undefined;
    return match?.title ?? data?.title ?? '';
  }, [data?.title, data?.otherVersionConfig, curProductPlan?.code, curProductPlan?.productType]);

  const displayedSubTitle = useMemo(() => {
    const list = data?.otherVersionConfig;
    if (!list?.length || !curProductPlan) {
      return data?.subTitle ?? '';
    }
    const versionKey =
      getVersionKeyByPackageCode(curProductPlan?.code) ?? curProductPlan?.productType;
    const match = versionKey ? list.find((c) => c.key === versionKey) : undefined;
    return match?.subTitle ?? data?.subTitle ?? '';
  }, [data?.subTitle, data?.otherVersionConfig, curProductPlan?.code, curProductPlan?.productType]);

  return (
    <div className={styles.box}>
      <div className={styles.title}>{displayedTitle}</div>
      <div className={styles.subTitle}>{displayedSubTitle}</div>
      <div className={styles.price}>{priceBox}</div>
      <div className={styles.priceDesc}>{creditsBox}</div>
      <div className={styles.line}></div>
      <div className={styles.operation}>
        {opeationButton}
        {isFreePrice && <div className={styles.noCardHint}>{i18n('price.no_card_required')}</div>}
      </div>
      <div className={styles.featureWrap}>
        <div className={styles.featureBox}>
          {displayedBasicFeatures?.map((v: any, index: number) => {
            return (
              <div className={styles.featureItem} key={index}>
                <CheckOutlined className={styles.checkIcon} />
                <div className={styles.featureText}>{v}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.moreFeatureTitle}>{i18n('price.integrations')}</div>
        <div className={styles.featureBox}>
          {data?.moreFeatures?.map((v: any, index: number) => {
            return (
              <div className={styles.featureItem} key={index}>
                <CheckOutlined className={styles.checkIcon} />
                <div className={styles.featureText}>{v}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
