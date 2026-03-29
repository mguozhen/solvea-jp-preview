'use client';

import { useEffect } from 'react';

const PAP_PARTNER_KEY = 'pap_partner_id';

export function PostAffiliatePro() {
  useEffect(() => {
    let loaded = false;
    let scriptElement: HTMLScriptElement | null = null;

    // 仅保存 URL 中的 partner 到 localStorage，不清理 URL（清理在追踪完成后进行）
    function savePartnerFromUrl() {
      if (typeof window === 'undefined') return;

      const url = new URL(window.location.href);
      const partnerParam = url.searchParams.get('partner');

      if (partnerParam) {
        localStorage.setItem(PAP_PARTNER_KEY, partnerParam);
        console.log('PAP partner saved to localStorage:', partnerParam);
      }
    }

    // 移除 URL 中的 partner 参数
    function cleanPartnerFromUrl() {
      if (typeof window === 'undefined') return;

      const url = new URL(window.location.href);
      if (url.searchParams.has('partner')) {
        url.searchParams.delete('partner');
        window.history.replaceState({}, '', url.pathname + url.search + url.hash);
        console.log('Partner parameter removed from URL');
      }
    }

    function loadPAP() {
      if (loaded) return;
      loaded = true;

      // 先保存 URL 中的 partner（不清理，等追踪后再清理）
      savePartnerFromUrl();

      // 检查脚本是否已存在
      const existingScript = document.getElementById('pap_x2s6df8d');
      if (existingScript) {
        runTrackerWhenReady();
        return;
      }

      // 创建并加载脚本
      scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.id = 'pap_x2s6df8d';
      scriptElement.src = 'https://solveacx.postaffiliatepro.com/scripts/muud584jm7x';
      scriptElement.async = true;

      scriptElement.onload = () => {
        runTrackerWhenReady();
      };

      scriptElement.onerror = () => {
        console.warn('PAP script failed to load');
      };

      document.head.appendChild(scriptElement);
    }

    const TRACKER_READY_INTERVAL_MS = 50;
    const TRACKER_READY_MAX_ATTEMPTS = 40; // 约 2 秒

    // 等待 PostAffTracker 就绪后再执行追踪（脚本 onload 后 API 可能稍晚挂载）
    function runTrackerWhenReady() {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts += 1;
        if (typeof window !== 'undefined' && (window as any).PostAffTracker) {
          clearInterval(timer);
          initPAPTracker();
          return;
        }
        if (attempts >= TRACKER_READY_MAX_ATTEMPTS) {
          clearInterval(timer);
          console.warn('PostAffTracker not available after waiting');
        }
      }, TRACKER_READY_INTERVAL_MS);
    }

    function initPAPTracker() {
      try {
        if (typeof window === 'undefined' || !(window as any).PostAffTracker) return;

        const PostAffTracker = (window as any).PostAffTracker;
        PostAffTracker.setAccountId('default1');
        PostAffTracker.setParamNameUserId('partner');

        // PAP 从当前页 URL 读取 partner，无 setParamValue API。确保 URL 带 partner 再 track
        const url = new URL(window.location.href);
        const savedPartner = localStorage.getItem(PAP_PARTNER_KEY);
        if (savedPartner && !url.searchParams.has('partner')) {
          url.searchParams.set('partner', savedPartner);
          window.history.replaceState({}, '', url.pathname + url.search + url.hash);
        }

        PostAffTracker.track();
        console.log('PAP tracking executed successfully');
        cleanPartnerFromUrl();
      } catch (err) {
        console.warn('PAP tracking failed:', err);
      }
    }

    // 立即加载
    loadPAP();

    // 清理函数（可选）
    return () => {
      // 组件卸载时不移除脚本，因为 PAP 需要在整个会话中保持
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return null; // 不渲染任何内容
}
