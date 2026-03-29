'use client';

import { getLang } from '@/i18n';
import { getGoogleId, getUserInfo } from '@/util/services';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Props = {
  initialLang: string;
  /** /agent 等页面不弹 One Tap */
  skip?: boolean;
};

function isGsiEnvAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  const isProd = process.env.APP_ENV === 'production';
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const isStaging = host.includes('staging');
  return isProd || isLocal || isStaging;
}

/**
 * 根 layout 唯一挂载点：
 * 1. 每次 pathname 变化时重新查询登录状态
 * 2. 确认未登录（isLogin === false）、环境允许、非中文后，调 getGoogleId
 * 3. 用 promptedRef 防止同一页面重复 prompt（GSI 已 initialize 后只需再 prompt 一次）
 */
export function GoogleIdentityServicesHost({ initialLang, skip }: Props) {
  const pathname = usePathname();
  /** null: 校验中；true: 已登录；false: 未登录 */
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const promptedRef = useRef(false);

  // 每次 pathname 变化重新校验登录态（客户端导航不重载组件）
  useEffect(() => {
    if (skip) return;

    let cancelled = false;
    setIsLogin(null);
    promptedRef.current = false;

    (async () => {
      try {
        const user = await getUserInfo();
        if (!cancelled) setIsLogin(!!user);
      } catch {
        // 401/网络错误 → 视为未登录
        if (!cancelled) setIsLogin(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [skip, pathname]);

  // 确认未登录后弹 One Tap
  useEffect(() => {
    if (skip) return;
    if (isLogin !== false) return; // null（校验中）或 true（已登录）均跳过
    if (!isGsiEnvAllowed()) return;
    if (promptedRef.current) return;

    const lang = typeof window !== 'undefined' ? getLang() : initialLang;
    if (lang === 'zh-CN') return;

    promptedRef.current = true;
    getGoogleId(lang);
  }, [skip, isLogin, initialLang]);

  return <div id="g_id_onload" />;
}
