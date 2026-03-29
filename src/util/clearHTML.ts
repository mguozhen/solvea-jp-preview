/**
 * 清楚文本中的html标签
 * @param html 标签字符串
 * @returns 
 */
export default function clearHtml(html: string) {
  // 先过滤figure标签，再提取文字
  const figureReg = /^<figure.*?<\/figure>/gms;
  // 全部标签
  const tagReg = /<[^<>]+>/g;
  // 转义字符
  const turnReg = /&nbsp;/g;
  // url
  const urlReg =
    /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/gi;
  if (!html || html.trim() === '') return '';
  return html
    ?.replace(figureReg, '')
    ?.replace(tagReg, '')
    ?.replace(turnReg, ' ')
    ?.replace(urlReg, '')
    ?.replace(/&amp;/g, '&')
    ?.slice(0, 600)
    ?.trim();
};
