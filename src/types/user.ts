export type SystemType = 'VOC' | 'SERVICE_GPT';
export type LangShort = 'en' | 'cn' | 'jp' | 'fr' | 'de' | 'pt' | 'es' | 'zh';
export type Lang =
  | 'en-US'
  | 'zh-CN'
  | 'ja-JP'
  | 'fr-FR'
  | 'de-DE'
  | 'pt-PT'
  | 'es-ES';
export type Country = 'cn' | 'us' | 'jp';
export type SubscribeType =
  | 'BASIC'
  | 'TRIAL'
  | 'LITE'
  | 'PRO'
  | 'TEAM'
  | 'BUSINESS'
  | 'ENTERPRISE'
  | 'FREE';
export type QueryPriceIdData = Record<SubscribeType, PayType>;
export type UpgradeType = 'ProM' | 'ProY' | 'TeamM' | 'TeamY';
export type PayType =
  | 'Shulex_VOC_internal_VIP'
  | 'Shulex_VOC_618_VIP'
  | 'Shulex_VOC_TEAM_VIP'
  | 'Shulex_Seller_Spirit_Pro'
  | 'Shulex_Seller_Spirit_Team';

export interface UserAvailable {
  isPlg?: boolean;
  availableCount?: number;
  subscribeType?: SubscribeType;
  isExpire?: boolean;
  ExpireTime?: string;
  availableNumberOfAnalyses?: number;
  totalNumberOfAnalyses?: number;
}

export interface CurrentUser {
  accountCode: string;
  email: string;
  utm: string;
  realAccountCode?: string;
  expireTime?: string;
  account_code?: string;
  userName?: string;
  nickName?: string;
  isForge?: boolean;
  country?: Country;
  lang?: Lang;
  isAdmin?: boolean;
  isCN?: boolean;
  entrance?: SystemType;
}
