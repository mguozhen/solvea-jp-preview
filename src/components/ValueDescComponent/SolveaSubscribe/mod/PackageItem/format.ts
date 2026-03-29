import { getPricingData } from '../../constant';
import { IPackageItem, PayDateType } from '../../interface';

const PACKAGE_CODE_VERSION_MAP: Record<string, string> = {
  solvea_plg_basic_monthly_50k: 'pro',
  solvea_plg_basic_monthly_70k: 'plus',
  solvea_plg_basic_annually_50k: 'pro',
  solvea_plg_basic_annually_70k: 'plus',
};

/** 根据套餐 code 获取对应展示版本 key，命中 PACKAGE_CODE_VERSION_MAP 时按 pro/plus 等版本展示 */
export function getVersionKeyByPackageCode(code?: string): string | undefined {
  return code ? PACKAGE_CODE_VERSION_MAP[code] : undefined;
}

// 处理套餐数据，将套餐数据转换为套餐列表数据
export function formatPackageList(packageList?: IPackageItem[], billCycle?: PayDateType) {
  return getPricingData().map((item) => {
    // free & basic版本
    if (item.key === 'free') {
      const freeList = (packageList ?? []).filter((v) => v.productType === 'free');

      return {
        ...item,
        creditsFixed: freeList?.[0]?.credit,
      };
    }

    if (item.key === 'basic') {
      const basicList = (packageList ?? [])
        .filter((v) => v.productType === 'basic' && v.billCycle === billCycle)
        .sort((a, b) => a.priority - b.priority);

      return {
        ...item,
        creditsList: basicList,
      };
    }

    // pro版本，目前先不展示
    if (item.key === 'pro') {
      const proList = (packageList ?? [])
        .filter((v) => v.productType === 'pro' && v.billCycle === billCycle)
        .sort((a, b) => a.priority - b.priority);

      return {
        ...item,
        creditsList: proList,
      };
    }

    return item;
  });
}

// 对价格不保留小数
export function formatPrice(price?: string) {
  if (!price) {
    return 0;
  }
  return Math.floor(Number(price));
}
