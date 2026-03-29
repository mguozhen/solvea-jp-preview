/* eslint-disable no-unused-vars */
declare module '*.less';
declare module '*.css';
// @ts-ignore
declare const $RefreshReg$: (_: any, _2: any) => void;

interface Window {
  readonly SSR?: boolean; // 这个在页面模板里定义，确保是SSR渲染
  readonly VERSION: string;
  readonly REFERER: string; // 上一个页面的地址（不含hash）
  readonly useNewApi?: boolean;
  readonly apiMapping?: [string, string][];
  readonly SHULEX_CDN_PATH: string;
  readonly APP_NAME: string;
  readonly APP_PATH_NAME: string;
  // @ts-ignore
  $RefreshReg$: (_: any, _2: any) => void;
  $RefreshSig$: () => void;
  hbspt: any;
}

type StoreModel<S, I> = I & { state: S };
declare const PRODUCTION: boolean;
declare let __webpack_public_path__: string;

type DispatchAction = {
  type: string;
  // @ts-ignore
  payload?: any;
};

declare const bizEnv: string;

type Dispatch<StoreState> = (
  action: DispatchAction,
  // @ts-ignore
) => Promise<StoreState | any>;

// 用这个给类型的定义增加dispatch来满足connect
type PropsWithDispatch<StoreState, T> = T & {
  dispatch: Dispatch<StoreState>;
};

declare namespace NodeJS {
  interface Process {
    dev: boolean; // process.dev
  }
}

type OptionItem = {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
};

type TicketNumber = string;

/**
 * 通用CSS Props
 */
interface BaseCSSProps {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式
   */
  style?: React.CSSProperties;
}

/**
 * @brief 表示和Tag相关的网络请求参数
 * 全局几乎所有接口都通用的标签筛选
 * 少量接口会采用以下描述的模式，这里不涉及，大家自己去处理
 * - tagField
 * - childTagField
 * - tagValue
 */
interface TagParams {
  /// 一级分类
  grandName?: string; // satisfaction
  /// 二级分类
  parentName?: string; // recommendation
  /// 三级分类
  tagName?: string;
  /// 观点标：代表维度；场景标：代表具体场景
  aspect?: string;
  /// 观点
  opinion?: string;
  /// 场景观点
  aspectOpinion?: string;
}

interface CurrentUser {
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
  lang?: 'en-US' | 'zh-CN';
  isAdmin?: boolean;
  isCN?: boolean;
  entrance?: SystemType;
  allUserSocialUserType?: string[];
}

interface ModuleContextData {
  offsetY: number;
  moduleInitRecord: Record<string, boolean>;
  onModuleInitRecordChange: (key: string, value?: boolean) => void;
  changeUuid: string;
}
