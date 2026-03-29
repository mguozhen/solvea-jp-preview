import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { StoryCard } from 'pages/customer-stories/mod/StoryCard';

interface SolutionCase {
  title?: string;
  content?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  solutions?: {
    title?: string;
    content?: string;
  }[];
}

export interface SolutionsProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  cases?: SolutionCase[];
  theme?: 'dark' | 'light';
}

function SolutionCard({ data, index }: { data: SolutionCase; index: number }) {
  return (
    <div className={cx(styles.solutionCard, `color-${index % 3}`)}>
      <StoryCard
        isSolvea={true}
        type={'arrow'}
        className={cx(styles.storyCard)}
        classNames={{ description: styles.storyCardDescription }}
        story={{
          productImage: data.image || '',
          moreUrl: data.href || '',
          brandName: data.title || '',
          title: data.content || '',
          key: `${index}`,
        }}
      />
    </div>
  );
}

export default function Solutions(props: SolutionsProps) {
  const { className, style, title, cases } = props;

  return (
    <div className={cx(styles.container, className)} style={style}>
      {title && <div className={styles.title}>{title}</div>}

      {cases && (
        <div className={styles.cases}>
          {cases.map((item, index) => {
            return <SolutionCard key={index} data={item} index={index} />;
          })}
        </div>
      )}
    </div>
  );
}
