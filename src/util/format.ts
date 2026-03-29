import { errorLog } from './trace';

// trim string
export const trim = (value?: string | number | boolean) =>
  String(value)
    .replace(/[\s\u00A0]+/g, ' ') // 普通空格|office不间断空格
    .replace(/[\u200E\u200F]/, '')
    // eslint-disable-next-line
    .replace(/[\x0F]/g, '') // control characters
    .trim();

// 过滤HTML标签, (like PHP's strip_tags, phpjs.org)
// stripTags('<p>paragraph</p><!-- Comment --><a href="#fragment">link</a>','<p><a>' )
export function stripTags(input?: string, allowed = '') {
  // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  const allowable = (
    `${allowed || ''}`.toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
  ).join('');
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input
    ? input
        .replace(commentsAndPhpTags, '')
        .replace(tags, ($0, $1) =>
          allowable.includes(`<${$1.toLowerCase()}>`) ? $0 : '',
        )
    : '';
}

// Replace string with Array, 支持正则替换 [[/key/, 'val'], [/key2/, 'val2']]
// replaceWithArray("一月 十一月 一月", [[/(?<!十)一月/g, '1'], ['十一月', '##']]); // 中文不支持 \b单词边界
// replaceWithArray("一月 十一月 一月", [[/(?<=[\x00-\xff]|^)一月/g, '1'], ['十一月', '##']]);
export function replaceWithArray(s: string, arr = []) {
  if (!arr || arr.length < 1) return s;
  let val = trim(s);
  arr.forEach(([k, v]) => {
    val = val.replace(k, v);
  });
  return val;
}

// string => number (去,号)
// export const toNumber = s => Number(String(s).replace(/[^\d.]+/g, ''));
// toNumber('12.543,21 €'), toNumber('£1.50'), toNumber('19,1 kg'), toNumber('२१', [[/१/g, 1], [/२/g, 2]])
export function toNumber(s: string | number, clean = []) {
  if (!s) return 0; // Number.NaN
  if (!Number.isNaN(Number(s))) return Number(s); // 如果是合法数字, 直接返回
  let n = String(s);
  if (clean) n = replaceWithArray(n, clean);
  n = n.replace(/[^\d,.\s]+/g, '').trim(); // clean(先保留空格)
  // 空格补全小数点: Video Games(US): "46 96"=>46.96, FR :"27 767,23€" => 27.767,23
  n = n.split(/\s+/).join('.');
  let [thousandsChar, decimalChar] = ['', '']; // 千位符, 小数符
  n.split('')
    .reverse()
    .some((e, i) => {
      // 倒叙查找[.,]
      if (!Number.isNaN(parseInt(e, 10))) return false; // 非[.,] (直接跳过数字)
      if (i >= 3) {
        thousandsChar = e;
      } else {
        decimalChar = e;
      }
      // console.warn(i, i >= 3, { thousandsChar, decimalChar });
      return i >= 3; // break
    });
  if (thousandsChar) n = n.replace(new RegExp(`\\${thousandsChar}`, 'g'), '');
  if (decimalChar) n = n.replace(decimalChar, '.');
  // console.warn(n, { thousandsChar, decimalChar });
  return Number(n);
}

// roundNumber, 默认保留2位小数(如果有); 防止小数相减出现浮点数误差(e.g. 4.56 - 0.91)
export function roundNumber(num: string | number, fixed = 2) {
  const pow = 10 ** fixed; // Math.pow(10, fixed);
  return Math.round(Number(num) * pow) / pow;
}

// 强制保留n位小数, toFixed 的值是 string, 要Number()后计算
export function toFixed(num: string | number, n = 2) {
  return roundNumber(num || '').toFixed(n);
}

// 数字 千分位格式化 (number with commas as thousands separators)
// fixed 强制保留n 位小数位
export function formatThousands(
  num: number,
  opts?: { separator: string; fixed: number },
) {
  const { separator = ',', fixed = 0 } = opts || {};
  // return Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })
  const n = fixed ? toFixed(num) : num;
  const str = (n || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return str;
}
/**
 * 计算比例
 * @param count 分子
 * @param total 坟墓
 * @param n 保留位数
 * @returns 返回不带百分号的值
 */
export function percent(count: number, total: number, n = 2) {
  //  Math.min(100, t.count / m.total * 100).toFixed(2)
  return toFixed(Math.min(100, (count / total) * 100), n);
}

/**
 * 返回一个数的百分比格式
 * @param num
 * @param fixed 一个数的百分比
 * @returns
 */
export function formatPercentage(num: number, fixed?: number) {
  if (Number.isNaN(num)) {
    return '';
  }
  return `${toFixed(num * 100, fixed)}%`;
}

// autolink 排除 <a>, attr=内的 链接
// `<!DOCTYPE html "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"> <a href="https://l1.cc"> https://li.cc </a> <img src="https://x.cc" t='http://x.cc' /> ! https://s.cc/a_1/d-2.htm?t=%a&6#x d`
// replace plain URLs with links
export function linkify(text = '', opts?: { url: boolean; mail: boolean }) {
  const { url = true, mail = false } = opts || {};
  let result = text || '';
  // console.warn(
  //   { text, url, mail },
  //   `replace(${urlReg}, '<a href="$&" target="_blank">$&</a>')`,
  //   `replace(${mailReg}, '<a href="$&" target="_blank">$&</a>')`,
  // )
  if (url) {
    try {
      // eslint-disable-next-line
      const urlReg = new RegExp(
        '(?![^<]*>|[^<>]*<\\/(?!(?:[^a])))(https?:\\/\\/[\\w?=&./-;#~%-]+)',
        'gi',
      );
      result = result.replace(urlReg, '<a href="$&" target="_blank">$&</a>');
    } catch (error) {
      // ignore
      console.log('linkify_error', error);
      errorLog(error);
    }
  }
  if (mail) {
    try {
      // eslint-disable-next-line
      const mailReg = new RegExp(
        '(?<!(>|mailto:).*)[\\w.]+@[a-zA-Z_-]+?(?:\\.[a-zA-Z]{2,6})+',
        'gim',
      );
      result = result.replace(mailReg, '<a href="mailto:$&">$&</a>');
    } catch (error) {
      // ignore
      console.log('linkify_error', error);
      errorLog(error);
    }
  }
  return result;
}

// test@email => te**@email
export function protectEmail(source: string, hide = 0) {
  const email = source || '';
  const count = hide || Math.floor(email.split('@')[0].length / 2);
  return email.replace(new RegExp(`\\S{0,${count}}(?=@)`), '*'.repeat(count));
}

// get asin via url
// ['/dp/2973106011?ref_=', '/asin/B0075N331I', 'gp/product/B07P2VZ6ZL/'].map(o=> o.match(/(?:[/])(B[A-Z\d]{9}|\d{9}[A-Z\d])(?:[/?]|$)/))
export function getAsin(url?: string) {
  const m = String(url).match(/(?:[/])(B[A-Z\d]{9}|\d{9}[A-Z\d])(?:[/?]|$)/);
  return m ? m[1] : '';
}

export function getTLD(url?: string) {
  // 获取 域名后缀 (com/co.jp)
  return (String(url).match(/.*\.amazon\.((\w+\.)?\w+)/) || [])[1];
}

// flatten tree-to-array
// flat({ children: [...], id: 0 })
export function flat(
  tree: { id?: number | string; children?: [] } | never[],
): unknown[] {
  const { id = null, children = [] } = Array.isArray(tree)
    ? { children: tree }
    : tree;
  return (children || []).reduce((acc, o) => {
    const [last]: any = acc.slice(-1);
    if (last) last.children = []; // clean
    // console.warn({ acc, last })
    return [...acc, ...flat(o)];
  }, [id !== undefined && id !== null ? tree : []].flat());
}

// 遍历
export function tranverseResult<T extends { children?: T[] }>(
  datum: T,
  parent: T | undefined,
  level: number,
  fn: (_a: T, _parent: T | undefined, _level: number) => T,
) {
  const retRoot = fn(datum, parent!, level);
  const ret = { ...retRoot };
  if (ret.children && ret.children.length > 0) {
    ret.children = ret.children?.map((child) => {
      return tranverseResult(child, ret, level + 1, fn);
    });
  } else {
    ret.children = undefined;
  }
  return ret;
}

// 遍历找到指定元素
export function deepListFindIndex<T extends { children?: T[] }>(
  list: T[],
  fn: (_item: T) => boolean,
): T | undefined {
  const ret: T | undefined = list.reduce((pre, cur) => {
    if (pre) {
      // 找到了就直接跳过
      return pre;
    }
    if (fn(cur)) {
      return cur;
    }
    if (cur?.children && cur.children.length > 0) {
      return deepListFindIndex(cur.children, fn);
    }
    return pre;
  }, undefined as T | undefined);
  return ret;
}
