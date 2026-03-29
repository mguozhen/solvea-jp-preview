import { localDownload } from './extension';

/**
 *
 * @param name 产品名称
 * @returns
 */
export const localDownloadGuide = (name: string) => {
  return `<ol><li><span>请确认当前浏览器为最新版本</span></li><li>点击本页<a href="${localDownload}" download>「下载到本地安装」</a>按钮下载crx文件</li><li>浏览器地址栏中输入 chrome://extensions</li><li>激活右上角开发者模式</li><li>将刚刚下载过的crx文件拖拽进步骤3的页面中</li><li><span>完成，请使用${name}相关功能</span></li></ol>`;
};

export const localDownloadDesc = `<div>请注意：<ul><li>请确保插件的权限为“允许所有网站”以便正常使用</li><li>通过本地下载安装的crx文件，安装后不能删除或移动位置，否则会导致插件无法使用。</li></ul></ul></div>`;
