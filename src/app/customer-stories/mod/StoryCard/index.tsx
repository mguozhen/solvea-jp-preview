import cx from 'classnames';
import { Line } from 'pages/mod/Line';
import { Arrow } from 'pages/mod/svgs/icons';
import { RelatedArticleCover } from './RelatedArticleCover';
import styles from './index.module.scss';

export interface StoryCardProps {
  indicator?: indicatorItem[];
  key: string;
  title: string;
  productImage: string;
  brandName: string;
  moreUrl: string;
  categoryName?: string;
  authorName?: string;
}

export const StoryCard = ({
  isSolvea,
  story,
  className,
  classNames,
  type,
  variant,
}: {
  isSolvea?: boolean;
  story: StoryCardProps;
  className?: string;
  classNames?: { description?: string };
  type?: string;
  variant?: 'relatedArticle';
}) => {
  if (variant === 'relatedArticle') {
    return (
      <div className={cx(styles.storyCard, styles.relatedArticle, className)}>
        <a href={story.moreUrl} target="_blank" rel="noreferrer">
          <div className={styles.relatedMedia}>
            <RelatedArticleCover
              src={story.productImage}
              brandName={story.brandName}
            />
          </div>
          <div className={styles.relatedBody}>
            {story.categoryName ? (
              <span className={styles.relatedCategory}>{story.categoryName}</span>
            ) : null}
            <h3 className={styles.relatedCardTitle} title={story.brandName}>
              {story.brandName}
            </h3>
            {story.authorName ? (
              <div className={styles.relatedAuthor}>{story.authorName}</div>
            ) : null}
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className={`${styles.storyCard} ${className} ${type}`}>
      <a href={story.moreUrl} target={'_blank'}>
        <img
          src={story.productImage}
          alt={story.brandName}
          width={400}
          height={363}
          loading="lazy"
        />
        <h3
          className={cx({
            [styles.storyTitle]: !isSolvea,
            [styles.solveaStoryTitle]: isSolvea,
          })}
          title={story.brandName}
        >
          <span>{story.brandName}</span>
          {type === 'arrow' ? <Arrow /> : null}
        </h3>
        {type === 'arrow' ? <Line className={'svg-line'} /> : null}
        <p
          className={cx(styles.storyDescription, classNames?.description, {
            [styles.solveaStoryDescription]: isSolvea,
          })}
          title={story.title}
        >
          {story.title}
        </p>
      </a>
    </div>
  );
};
