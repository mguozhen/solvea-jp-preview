/* eslint-disable no-unused-vars */
type Market =
  | 'us'
  | 'de'
  | 'ca'
  | 'mx'
  | 'uk'
  | 'fr'
  | 'it'
  | 'tr'
  | 'es'
  | 'nl'
  | 'br'
  | 'au'
  | 'cn'
  | 'jp'
  | 'in'
  | 'sg'
  | 'se'
  | 'ae'
  | 'pl'
  | 'sa'
  | 'eg'
  | 'be';

// 获取用户试用状态
interface QueryFreePackage {
  packSubscribeDetailEnum: QueryFreePackageType; // NOT_SUBSCRIBE未订阅  SUBSCRIBING订阅中   EXPIRED已过期
  expire: string;
  subscribeFreePackage: Boolean;
  currentCreateCount?: number;
  totalCreateCount?: number;
}

interface Insight {
  /// 类目id
  categoryId: number;
  /// 用户上传子ASIN数
  count: number;
  /// 创建时间
  createTime: string;
  /// 报告图片
  img?: string;
  /// 报告名称
  name: string;
  /// 描述
  desc?: string;
  /// 报告id
  reportId: number;
  /// 总共
  totalCount: number;
  /// 任务爬虫完成多少个变体ASIN
  doneSubCount: number;
  /// 任务爬虫失败多少个变体ASIN
  failCount: number;
  /// 任务爬虫完成多少个父ASIN
  doneParentCount: number;
  /// 是否是demo报告
  isDemo?: boolean;
  /// 预计完成时间
  predictCost?: number;
  /// 是否爬取完成
  isFinished?: boolean;
  /// 是否公共报告
  isPublic?: boolean;
  /// 公共数据
  publicDetail?: string;
  /// 创建类型
  reportSourceEnum?: 'NORMAL' | 'PLUGIN' | 'FAKE';
  /// 站点
  market?: string;
  /// 平台
  platform?: string;
  /// 实际进度总数
  totalProgressCount?: number;
  /// 星级 - 目前没有
  rate?: number;
  /// demo背景 - 目前没有
  background?: string;
  updateTime?: string;
}

type PayDateType = 'month' | 'year' | 'quarter';

interface AgentItem {
  title: string;
  desc: string;
  img: string;
  agentId: string;
  assistantId: string;
  tips: string;
  color: string;
  en: {
    assistantId: string;
    phoneNumber: string;
  };
  jp: {
    assistantId: string;
    phoneNumber: string;
  };
  es: {
    assistantId: string;
    phoneNumber: string;
  };
  stepList?: {
    title: string;
    content: string;
    image: string;
    index: number;
  }[];
}
