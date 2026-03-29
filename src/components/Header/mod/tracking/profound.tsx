'use client';

import { useEffect } from 'react';

/**
 * Profound 客户端追踪组件
 * 用于发送页面访问日志到 Profound 分析平台
 */
export default function TrackingProfound() {
  useEffect(() => {
    console.log('[Profound Tracking] 组件已挂载 ✅');

    // 发送页面访问日志
    const sendPageView = async () => {
      // 非生产环境不发送日志
      if (process.env.RUNNER_TAG !== 'prod' || process.env.NODE_ENV !== 'production') {
        return;
      }
      try {
        console.log('[Profound Tracking] 开始准备日志数据...');

        const log = {
          timestamp: new Date().toISOString(),
          method: 'GET',
          host: window.location.hostname,
          path: window.location.pathname,
          status_code: 200,
          ip: '0.0.0.0', // 客户端无法获取真实 IP
          user_agent: navigator.userAgent,
          query_params: Object.fromEntries(new URLSearchParams(window.location.search)),
          referer: document.referrer || undefined,
        };

        console.log('[Profound Tracking] 准备发送日志:', {
          env: process.env.JS_ENV,
          log,
        });

        console.log('[Profound Tracking] 正在发送到 /api/profound-log...');

        // 通过 API 路由发送（避免暴露 API Key）
        const response = await fetch('/api/profound-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([log]),
        });

        console.log('[Profound Tracking] 收到响应，状态码:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('[Profound Tracking] ✅ 发送成功:', result);
      } catch (error) {
        console.error('[Profound Tracking] ❌ 发送失败:', error);
        console.error('[Profound Tracking] 错误详情:', {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        });
      }
    };

    // 延迟发送，避免影响页面加载
    console.log('[Profound Tracking] 设置 1 秒延迟发送...');
    const timer = setTimeout(() => {
      console.log('[Profound Tracking] ⏰ 延迟时间到，开始发送');
      sendPageView();
    }, 1000);

    return () => {
      console.log('[Profound Tracking] 组件即将卸载，清理定时器');
      clearTimeout(timer);
    };
  }, []);

  return null;
}
