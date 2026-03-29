import { DOMParser } from 'linkedom';

// 对html进行锚点处理
export function extractAnchorsAndModifyHtml(html: string) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const anchors: any[] = [];
    let idCounter = 1; // 用于生成唯一的ID

    const generateUniqueId = () => {
      return `shulex_anchors_${idCounter++}`; // 生成唯一ID
    };
    const generateIdAndLevel = (element, level) => {
      const id = generateUniqueId(); // 使用计数器生成唯一ID
      element.id = id;

      return {
        text: element.innerText,
        id: id,
        level: level,
        children: [],
      };
    };

    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const stack: any[] = [];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1)); // 获取层级
      const anchor = generateIdAndLevel(heading, level);
      // 维护锚点层级结构
      while (
        stack.length &&
        (stack[stack.length - 1] as { level: number }).level >= level
      ) {
        stack.pop();
      }
      if (stack.length) {
        (stack[stack.length - 1] as { children: any[] }).children.push(anchor);
      } else {
        anchors.push(anchor);
      }

      stack.push(anchor);
    });

    return {
      modifiedHtml: doc.toString(),
      anchors: anchors,
    };
  } catch (error) {
    console.log('hyx error', error);
    return {};
  }
}

/** 仅保留指定 level 的标题（文中 DFS 顺序），子级不展开进 TOC */
export function anchorsAtLevelOnly(items: any[] | undefined, level: number): any[] {
  if (!items?.length) return [];
  const result: any[] = [];
  const walk = (nodes: any[]) => {
    for (const node of nodes) {
      if (node.level === level) {
        result.push({ ...node, children: [] });
      }
      if (node.children?.length) {
        walk(node.children);
      }
    }
  };
  walk(items);
  return result;
}

