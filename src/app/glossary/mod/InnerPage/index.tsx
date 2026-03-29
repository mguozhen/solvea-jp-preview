'use client';

import BreadCrumb from 'components/BreadCrumb';
import GetStartedBtn from 'components/ValueDescComponent/GetStartedBtn';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import Sections, { SectionItem } from 'pages/customer-stories/[slug]/mod/Sections';
import { Indicator } from 'pages/customer-stories/[slug]/mod/SidePanel';
import { StoryCard, StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { Line } from 'pages/mod/Line';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLink } from 'util/getLink';
import { SidePanel } from '../SidePanel';
import { StartNowBtn } from '../StartNowBtn';
import styles from './index.module.scss';

export const InnerPage = ({
  data,
  stories,
  type,
}: {
  data: {
    categoryName: string;
    title: string;
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
  type: 'glossary';
}) => {
  const [activeAnchor, setActiveAnchor] = useState('');
  const activeAnchorRef = useRef(activeAnchor);
  const isClickScrollingRef = useRef(false);

  /** 将锚点树展平为有序列表，供 TOC 与滚动高亮使用 */
  const flatAnchors = useMemo(() => {
    const flatten = (
      items: { id?: string; text?: string; children?: any[] }[],
    ): { id: string; text: string }[] => {
      if (!items?.length) return [];
      return items.flatMap((item) => [
        { id: item.id!, text: (item.text ?? '').replace(/^\d+\.\s*/, '').trim() },
        ...flatten(item.children ?? []),
      ]);
    };
    return flatten(data?.anchors ?? []);
  }, [data?.anchors]);

  const onAnchorClick = (id: string) => {
    try {
      const target = document.querySelector(`#${id}`) as any;
      setActiveAnchor(id);
      activeAnchorRef.current = id;
      isClickScrollingRef.current = true;
      window.scrollTo({ behavior: 'smooth', top: target?.offsetTop - 12 });
      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 800);
    } catch (error) {}
  };

  const handleScroll = useCallback(() => {
    if (!flatAnchors.length) return;
    if (isClickScrollingRef.current) return;

    const scrollY = window.scrollY;
    /** 视口顶部往下多少 px 视为“当前章节” */
    const offset = 120;

    const withPos = flatAnchors
      .map((v) => {
        const el = document.getElementById(v.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id: v.id, top: rect.top + scrollY };
      })
      .filter((v): v is { id: string; top: number } => v !== null);

    if (withPos.length === 0) return;
    withPos.sort((a, b) => a.top - b.top);

    const atBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
    let targetId: string;
    if (atBottom) {
      targetId = withPos[withPos.length - 1].id;
    } else {
      const line = scrollY + offset;
      const nextIndex = withPos.findIndex((a) => a.top > line);
      if (nextIndex === -1) {
        targetId = withPos[withPos.length - 1].id;
      } else if (nextIndex === 0) {
        targetId = withPos[0].id;
      } else {
        targetId = withPos[nextIndex - 1].id;
      }
    }

    if (targetId && targetId !== activeAnchorRef.current) {
      activeAnchorRef.current = targetId;
      setActiveAnchor(targetId);
    }
  }, [flatAnchors]);

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 100), [handleScroll]);
  const glossaryListHref = getLink('/glossary');

  useEffect(() => {
    if (!flatAnchors.length) return;
    setActiveAnchor(flatAnchors[0].id);
    activeAnchorRef.current = flatAnchors[0].id;
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 300);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      debouncedHandleScroll.cancel();
      clearTimeout(timeoutId);
    };
  }, [flatAnchors, debouncedHandleScroll, handleScroll]);

  return (
    <main className={`${styles.wrap} side-fade`}>
      <div className={styles.container}>
        <div className={styles.main}>
          {/* ── Full-width article header: breadcrumb + title + author meta ── */}
          <div className={styles.header}>
            <div className={styles.breadcrumbs}>
              <BreadCrumb
                className={styles.articleCrumb}
                data={[{ label: 'Glossary', route: '/glossary' }, { label: data?.categoryName }]}
              />
            </div>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.glossaryMeta}>
              <a
                className={styles.glossaryMetaAuthor}
                href="https://solvea.cx/author/ivychen"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.glossaryTitleAvatar}>
                  <img
                    src={
                      data?.author?.avatar ??
                      'https://cdn.shulex-voc.com/shulex/upload/2026-01-20/8c8e3f1a-135e-4192-8fe7-e7f9f24f3a82.png'
                    }
                    alt=""
                  />
                </div>
                <div className={styles.glossaryMetaContent}>
                  <span className={styles.glossaryMetaLabel}>Written by</span>
                  <span className={styles.glossaryMetaName}>
                    {data?.author?.name ?? 'Ivy Chen'}
                  </span>
                </div>
              </a>
              <div className={styles.glossaryMetaDivider} aria-hidden />
              <div className={styles.glossaryMetaAside}>
                <span className={styles.glossaryMetaLabel}>
                  Last updated:{' '}
                  {data?.author?.lastUpdated
                    ? dayjs(data.author.lastUpdated).format('MMMM D, YYYY')
                    : '—'}
                </span>
                <span className={styles.glossaryVerifiedRow}>
                  <span className={styles.glossaryVerifiedText}>Expert Verified</span>
                  <span className={styles.glossaryVerifiedBadge} aria-hidden>
                    <svg
                      width="11"
                      height="9"
                      viewBox="0 0 11 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4.5L4 7.5L10 1"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* ── Three-column body: TOC | article | CTA ── */}
          <div className={styles.content}>
            <SidePanel
              list={
                flatAnchors.length > 0
                  ? flatAnchors.map((v) => ({
                      value: v.text,
                      id: v.id,
                      isActive: activeAnchor === v.id,
                      onClick: () => onAnchorClick(v.id),
                    }))
                  : data?.indicator ?? []
              }
              className={styles.left}
              type={type}
            />
            <Sections
              className={styles.postContent}
              data={data?.contentList ?? []}
              desc={data?.desc}
              type={data?.renderType}
            />
            <StartNowBtn />
          </div>

          <Line />
          <div className={styles.lastStories}>
            {!!stories.length && (
              <>
                <header className={styles.relatedHeader}>
                  <div className={styles.relatedHeaderLeft}>
                    <h2 className={styles.relatedTitle}>Related Articles</h2>
                  </div>
                  <GetStartedBtn link={glossaryListHref} text="See All Articles" type="black" />
                </header>
                <div className={styles.relatedArticlesGrid}>
                  {stories.slice(0, 6).map((story, index) => (
                    <StoryCard story={story} key={story.key || index} variant="relatedArticle" />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
