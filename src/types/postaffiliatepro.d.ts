/* eslint-disable no-unused-vars */
/**
 * PostAffiliatePro 全局类型定义
 */
declare global {
  interface Window {
    PostAffTracker: {
      /**
       * 设置账户 ID
       */
      setAccountId: (id: string) => void;
      
      /**
       * 追踪页面访问
       */
      track: () => void;
      
      /**
       * 追踪注册转化
       */
      register: () => void;
      
      /**
       * 追踪销售转化
       * @param totalCost 总金额
       * @param orderId 订单ID
       * @param productId 产品ID（可选）
       * @param data1 自定义数据1（可选）
       * @param data2 自定义数据2（可选）
       */
      sale: (
        totalCost: string,
        orderId: string,
        productId?: string,
        data1?: string,
        data2?: string
      ) => void;
      
      /**
       * 追踪自定义动作
       * @param actionCode 动作代码
       */
      trackAction: (actionCode: string) => void;
    };
  }
}

export {};
