import React, { useCallback } from 'react';
import styles from './index.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import cx from 'classnames';
import remarkBreaks from 'remark-breaks';

interface Props {
  content: string;
  raw?: boolean;
  loading?: boolean;
  className?: string;
}

function Markdown(props: Props) {
  const { content, loading, className } = props;

  const htmlEntities = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
  };

  const renderLink = useCallback(({ href, children }) => {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }, []);
  const renderImage = useCallback(({ src, alt }) => {
    return <img src={src} alt={alt} style={{ maxWidth: '100%' }} />;
  }, []);

  const renderCode = ({ children }) => {
    const replaceStr = children.replace(
      /&lt;|&gt;|&amp;|&quot;|&#39;/g,
      (match) => htmlEntities[match],
    );
    return <code>{replaceStr}</code>;
  };

  const getEnContent = (content: string) => {
    try {
      const symbolMap = {
        // '，': ',',
        // '。': '.',
        '；': ';',
        '：': ':',
        '！': '!',
        '？': '?',
        '（': '(',
        '）': ')',
        '【': '[',
        '】': ']',
        '｛': '{',
        '｝': '}',
      };
      const pattern = new RegExp(`[${Object.keys(symbolMap).join('')}]`, 'g');
      return content?.replace(pattern, (match) => symbolMap[match]);
    } catch {
      return content;
    }
  };

  return (
    <ReactMarkdown
      components={{
        a: (props) =>
          renderLink({ href: props.href, children: props.children }),
        img: (props) => renderImage({ src: props.src, alt: props.alt }),
        code: (props) => renderCode({ children: props.children }),
      }}
      // rehypePlugins={raw ? [rehypeRaw] : undefined}
      remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
      className={cx(
        styles.markBox,
        { [styles.hide]: loading !== false },
        className,
      )}
    >
      {getEnContent(content)}
    </ReactMarkdown>
  );
}

export default Markdown;
