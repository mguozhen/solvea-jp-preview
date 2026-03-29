import React, { useCallback } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import dayjs from 'dayjs';
import clearHtml from 'util/clearHTML';

interface Props extends BaseCSSProps {
  blog?: {
    name?: string;
    post_title?: string;
    post_date?: string;
    post_name?: string;
    post_excerpt?: string;
    post_content?: string;
    slug?: string;
    twitter_image?: string;
    detailUrl?: string;
    categoryUrl?: string;
  };
  showType?: boolean;
  highLight?: string;
}

export default function BlogCard(props: Props) {
  const { className, style, blog, showType, highLight } = props;

  const highLightSectence = useCallback(() => {
    const regex = new RegExp(highLight || '', 'gi');
    let title = clearHtml(blog?.post_title || '');
    const matchedWord = regex.exec(title);
    return title.replace(
      regex,
      `<span style="background:#B1E5FC;border-radius:4px">${matchedWord}</span>`,
    );
  }, [blog, highLight, blog?.post_title]);

  const title = highLight
    ? highLightSectence()
    : clearHtml(blog?.post_title || '');
  return (
    <div className={cx(styles.container, className)} style={style}>
      <div className={styles.blogItem}>
        <div className={styles.imgBox}>
          <a
            className={styles.imgBoxInner}
            href={blog?.detailUrl}
            target="_blank"
          >
            <img
              src={blog?.twitter_image}
              alt={clearHtml(blog?.post_title || '')}
              className={styles.itemImg}
              loading="lazy"
            />
          </a>
        </div>
        <div className={styles.itemContent}>
          <div className={styles.contentTop}>
            {showType && (
              <a
                className={styles.itemType}
                href={blog?.categoryUrl}
                target="_blank"
              >
                {blog?.name}
              </a>
            )}
            <span className={styles.itemDate}>
              {dayjs(blog?.post_date).format('MMMM D, YYYY')}
            </span>
          </div>
          <a
            target="_blank"
            className={styles.itemTitle}
            title={blog?.post_title}
            href={blog?.detailUrl}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          ></a>
          <a
            target="_blank"
            className={styles.itemDesc}
            title={blog?.post_excerpt}
            href={blog?.detailUrl}
          >
            {clearHtml(blog?.post_excerpt || blog?.post_content || '')}
          </a>
        </div>
      </div>
    </div>
  );
}
