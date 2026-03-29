import styles from './index.module.scss';
import Markdown from 'markdown-to-jsx';
import { Quote } from 'pages/mod/svgs/icons';

export interface SectionItem {
  title?: string;
  content?: string;
}

interface Props {
  data?: SectionItem[];
  desc?: string;
  className?: string;
  type?: 'markdown' | 'html';
}

export default function Sections(props: Props) {
  const { data, className, type, desc } = props;

  function normalizeQuillListHTML(html) {
    // 匹配 <ol>...</ol> 块（处理嵌套的 li 标签）
    return html.replace(
      /<ol([^>]*)>([\s\S]*?)<\/ol>/g,
      (match, olAttrs, content) => {
        // 检查内容中是否包含带有 data-list="bullet" 的 li 标签
        if (/<li[^>]*data-list="bullet"[^>]*>/.test(content)) {
          // 将 ol 替换为 ul，并移除 data-list="bullet" 属性
          const cleanedContent = content.replace(
            /<li([^>]*)\s*data-list="bullet"([^>]*)>/g,
            '<li$1$2>',
          );
          return `<ul${olAttrs}>${cleanedContent}</ul>`;
        }
        // 如果没有 data-list="bullet"，保持原样
        return match;
      },
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {desc && (
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: desc || '' }}
        ></p>
      )}
      {data?.map((v, index) => {
        return (
          <div className={styles.item} key={index} data-aos="fade-right">
            {v.title && <div className={styles.title}>{v.title}</div>}
            <div className={styles.itemRight} data-aos="fade-left">
              {type === 'html' ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: normalizeQuillListHTML(v.content || ''),
                  }}
                />
              ) : (
                <Markdown
                  options={{
                    overrides: {
                      blockquote: {
                        component: ({ children }) => {
                          return (
                            <div className={styles.blockquote}>
                              <Quote className={styles.icon} />
                              <div className={styles.content}>{children}</div>
                            </div>
                          );
                        },
                      },
                    },
                  }}
                >
                  {v.content || ''}
                </Markdown>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
