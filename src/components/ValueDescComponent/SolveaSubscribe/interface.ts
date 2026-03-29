type PayDateType = 'monthly' | 'annually';

type PaymentMethod = 'stripe';

type PackageType = 'free' | 'basic' | 'pro' | 'enterprise';

interface IPackageItem {
  code: string;
  productPlanId: string;
  productType: PackageType;
  billCycle: PayDateType;
  price: string;
  discountedPrice: string;
  currency: string;
  credit: number;
  chosen: boolean;
  subscribed: boolean;
  canceled: boolean;
  paymentMethod: PaymentMethod;
  priceId: string;
  priority: number;
  level: number;
}

interface Subscription {
  currentPeriodEnd: number;
  currentPeriodStart: number;
  credits: number;
  remainCredits: number;
  subscriptionId: number;
  productPlanName: string;
  productPlanId: string;
  productType: PackageType;
  level: number;
}

interface PricingPlanItem {
  otherVersionConfig: any;
  key: PackageType;
  title: string;
  subTitle: string;
  price: string;
  creditsFixed?: number;
  creditsText?: string;
  creditsList?: IPackageItem[];
  basicFeatures: string[];
  moreFeatures: string[];
}

interface UserUsageCreditsDetailItem {
  bizType: string;
  amount: number;
}

interface UserUsageVibeCodingDetailItem {
  task: string;
  createdAt: string;
  credits: string;
}

interface UserUsage {
  periodId: number;
  periodStart: number;
  periodEnd: number;
  creditsDetail: UserUsageCreditsDetailItem[];
}

interface UserUsageCreditByBizType {
  periodId: number;
  creditBizType: string;
  creditsDetail: UserUsageVibeCodingDetailItem[];
  currPage: number;
  totalPage: number;
  total: number;
  pageSize: number;
}

export type {
  IPackageItem,
  PackageType,
  PayDateType,
  PaymentMethod,
  PricingPlanItem,
  Subscription,
  UserUsage,
  UserUsageCreditByBizType,
  UserUsageCreditsDetailItem,
  UserUsageVibeCodingDetailItem,
};
