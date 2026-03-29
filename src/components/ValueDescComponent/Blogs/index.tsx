import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Blog, { BlogProps } from '../Blog';
import styles from './index.module.scss';
import useResizeObserver from '@react-hook/resize-observer';
import { Carousel, Tabs } from 'antd';

interface BlogsProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  blogs?: BlogProps[];
  categories?: { category?: string; blogs?: BlogProps[] }[];
  smallImage?: boolean;
  theme?: 'dark' | 'light';
}

function BlogList(props: { blogs?: BlogProps[]; smallImage?: boolean }) {
  const { blogs = [], smallImage } = props;
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const [size, setSize] = useState(3);

  useResizeObserver(ref, (entry) => {
    if (
      entry.borderBoxSize[0].inlineSize <= 1100 &&
      entry.borderBoxSize[0].inlineSize > 700
    ) {
      setSize(2);
    } else if (entry.borderBoxSize[0].inlineSize <= 700) {
      setSize(1);
    } else {
      setSize(3);
    }
  });
  useEffect(() => {
    if (window.innerWidth <= 700) {
      setSize(1);
    } else if (window.innerWidth > 700 && window.innerWidth <= 1100) {
      setSize(2);
    }
  }, []);
  const isEven = blogs?.length % 2 === 0;
  if (!isEven) {
    return (
      <div className={styles.content} ref={ref}>
        <Carousel ref={carouselRef}>
          {new Array(Math.ceil(blogs?.length / size))
            .fill(0)
            .map((i, index) => {
              return (
                <div key={index} className={styles.triple}>
                  {Array.isArray(blogs) &&
                    blogs
                      .slice(index * size, (index + 1) * size)
                      .map((item, index) => {
                        return (
                          <Blog
                            key={index}
                            {...item}
                            type="odd"
                            smallImage={smallImage}
                          />
                        );
                      })}
                </div>
              );
            })}
        </Carousel>
      </div>
    );
  } else {
    return (
      <div className={styles.even}>
        {blogs.map((blog, index) => {
          return (
            <Blog type="even" {...blog} key={index} smallImage={smallImage} />
          );
        })}
      </div>
    );
  }
}

/**
 * 1. 有多个分类，用tabs展示
 * 2. 3个以上、单数：轮播形式
 * 3. 双数：多行排列，一行两个且非移动端blog样式为左图右文的卡片
 * @param props
 * @returns
 */
export default function Blogs(props: BlogsProps) {
  const {
    className,
    style,
    blogs = [],
    title,
    smallImage,
    categories,
    theme = 'light',
  } = props;
  if (categories) {
    const items =
      Array.isArray(categories) &&
      categories?.map((item, index) => {
        return {
          key: index + '',
          label: item.category,
          children: <BlogList blogs={item?.blogs} smallImage={smallImage} />,
        };
      });
    return (
      <div
        className={cx(styles.container, className, {
          [styles.dark]: theme === 'dark',
          [styles.light]: theme === 'light',
        })}
        style={style}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        <Tabs items={items as any} />
      </div>
    );
  } else {
    return (
      <div
        className={cx(styles.container, className, {
          [styles.dark]: theme === 'dark',
          [styles.light]: theme === 'light',
        })}
        style={style}
      >
        {title && <h2 className={styles.title}>{title}</h2>}
        <BlogList blogs={blogs} smallImage={smallImage} />
      </div>
    );
  }
}
