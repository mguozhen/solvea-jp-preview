'use client';

import i18n from '@/i18n';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import Sections, { SectionItem } from 'pages/customer-stories/[slug]/mod/Sections';
import { Indicator, SidePanel } from 'pages/customer-stories/[slug]/mod/SidePanel';
import { Skeptics } from 'pages/customer-stories/[slug]/mod/Skeptics';
import { StoryCard, StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { Line } from 'pages/mod/Line';
import ScrollingBrandWall from 'pages/mod/ScrollingBrandWall';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.scss';

export const InnerPage = ({
  data,
  stories,
  type,
}: {
  data: {
    title: string;
    productImage: string;
    indicator: Indicator[];
    contentList: SectionItem[];
    desc?: string;
    renderType?: 'html' | 'markdown';
    anchors?: any[];
    author?: {
      name: string;
      avatar: string;
      lastUpdated: string;
    };
  };
  stories: StoryCardProps[];
  type: 'customer-stories' | 'glossary';
}) => {
  const [activeAnchor, setActiveAnchor] = useState('');
  const activeAnchorRef = useRef(activeAnchor);
  const isClickScrollingRef = useRef(false);

  const onAnchorClick = (id: string) => {
    try {
      const target = document.querySelector(`#${id}`) as any;
      // 立即更新高亮状态
      setActiveAnchor(id);
      activeAnchorRef.current = id;
      // 标记正在通过点击进行滚动
      isClickScrollingRef.current = true;

      window.scrollTo({ behavior: 'smooth', top: target?.offsetTop - 12 });

      // 等待滚动动画完成后再允许滚动监听更新高亮
      // smooth scroll 通常需要 500-1000ms，我们设置为 800ms 以确保滚动完成
      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);
    } catch (error) {}
  };

  const handleScroll = useCallback(() => {
    if (!data?.anchors?.length) return;

    // 如果是通过点击触发的滚动，暂时不更新高亮
    // 这样可以确保点击时的高亮立即生效，不会被滚动监听覆盖
    if (isClickScrollingRef.current) return;

    const scrollPosition = window.scrollY;
    const offset = 150; // 触发高亮的偏移量

    // 找到所有可见的锚点元素
    const visibleAnchors = data?.anchors
      ?.map((v) => {
        const element = document.getElementById(v.id);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          id: v.id,
          top: rect.top + scrollPosition,
          bottom: rect.bottom + scrollPosition,
          element,
        };
      })
      .filter((v) => v !== null);

    if (visibleAnchors.length === 0) return;

    // 按从上到下的顺序排序
    visibleAnchors.sort((a, b) => a!.top - b!.top);

    let targetId = '';

    // 检查是否滚动到页面底部
    const isAtBottom =
      window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - 100;
    if (isAtBottom) {
      // 高亮最后一个锚点
      targetId = visibleAnchors[visibleAnchors.length - 1]!.id;
    } else {
      // 找到第一个超过滚动位置 + offset 的锚点
      // 如果没有，则选择最后一个在当前滚动位置上方的锚点
      const target = visibleAnchors.find((anchor) => anchor!.top > scrollPosition + offset);
      if (target) {
        // 找到目标锚点，选择它的前一个（如果存在）或它自己
        const targetIndex = visibleAnchors.indexOf(target);
        targetId = targetIndex > 0 ? visibleAnchors[targetIndex - 1]!.id : visibleAnchors[0]!.id;
      } else {
        // 所有锚点都在上方，选择最后一个
        targetId = visibleAnchors[visibleAnchors.length - 1]!.id;
      }
    }

    if (targetId && targetId !== activeAnchorRef.current) {
      setActiveAnchor(targetId);
      activeAnchorRef.current = targetId;
    }
  }, [data?.anchors]);

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 100), [handleScroll]);

  useEffect(() => {
    activeAnchorRef.current = activeAnchor;
  }, [activeAnchor]);

  useEffect(() => {
    if (!data?.anchors?.length) return;

    // 初始化：设置第一个锚点为活动状态
    if (data.anchors[0]?.id && !activeAnchor) {
      setActiveAnchor(data.anchors[0].id);
      activeAnchorRef.current = data.anchors[0].id;
    }

    // 添加滚动监听
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    // 初始执行一次，确保在页面加载时也能正确高亮
    // 使用 setTimeout 确保 DOM 已经渲染
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [data?.anchors, debouncedHandleScroll, handleScroll, activeAnchor]);

  return (
    <main className={`${styles.wrap} side-fade`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>{data?.title}</h1>
            {type === 'glossary' && (
              <div className={styles.glossaryMeta}>
                <a
                  className={styles.glossaryMetaItem}
                  href="https://solvea.cx/author/ivychen"
                  target="_blank"
                >
                  <div className={styles.glossaryTitleAvatar}>
                    <img
                      src={
                        data?.author?.avatar ??
                        'https://cdn.shulex-voc.com/shulex/upload/2026-01-20/8c8e3f1a-135e-4192-8fe7-e7f9f24f3a82.png'
                      }
                      alt="author"
                    />
                  </div>
                  <div className={styles.glossaryMetaContent}>
                    <div className={styles.glossaryMetaLabel}>Written by</div>
                    <div className={styles.glossaryMetaValue}>
                      {data?.author?.name ?? 'Ivy Chen'}
                    </div>
                  </div>
                </a>
                <div className={styles.glossaryMetaDivider} />
                <div className={styles.glossaryMetaItem}>
                  <div className={styles.glossaryMetaContent}>
                    <div className={styles.glossaryMetaLabel}>
                      Last updated: {dayjs(data?.author?.lastUpdated).format('MMM D, YYYY')}
                    </div>
                    <div className={styles.glossaryMetaValue}>
                      <span className={styles.glossaryVerifiedIcon}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.333 4L6 11.333 2.667 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Expert Verified
                    </div>
                  </div>
                </div>
              </div>
            )}
            {data?.productImage && (
              <div className={styles.brandIconWrap}>
                <picture>
                  <img
                    src={data?.productImage}
                    alt="brand"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={360}
                    className={styles.brandIcon}
                  />
                </picture>
              </div>
            )}
          </div>
          <Line />
          <ScrollingBrandWall />
          <Line />
          <div className={styles.content}>
            <SidePanel
              list={
                data?.anchors?.map((v) => ({
                  value: v?.text?.replace(/^\d+\.\s*/, '')?.trim(),
                  className: activeAnchor === v.id ? styles.active : styles.item,
                  onClick: () => onAnchorClick(v?.id),
                })) || data?.indicator
              }
              className={styles.left}
              title={i18n('solvea.Case_study_side_Title')}
              desc={i18n('solvea.Case_study_side_CTA')}
              buttonText={i18n('solvea.Case_study_side_button')}
              type={type}
            />
            <Sections
              className={styles.postContent}
              data={data?.contentList ?? []}
              desc={data?.desc}
              type={data?.renderType}
            />
          </div>
          <Line />
          <div className={styles.lastStories}>
            <div className={styles.title}>The lastest from Solvea.</div>
            <div className={styles.stories}>
              {!!stories.length && (
                <div className={styles.storiesGrid}>
                  {stories.slice(0, 4).map((story, index) => (
                    <StoryCard story={story} key={index} className={`s${index}`} type={'arrow'} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <Skeptics />
        </div>
      </div>
    </main>
  );
};
