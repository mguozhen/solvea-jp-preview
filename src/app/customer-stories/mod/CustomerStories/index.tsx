import i18n from '@/i18n';
import { Select } from 'antd';
import cx from 'classnames';
import { StoryCard, StoryCardProps } from 'pages/customer-stories/mod/StoryCard';
import { Button } from 'pages/mod/Button';
import { Line } from 'pages/mod/Line';
import { CloseIcon } from './closeIcon';
import { DownOutLinedIcon } from './downOutLinedIcon';
import styles from './index.module.scss';

export const CustomerStories = ({
  data,
  endIndex = 6,
  needFilter = false,
  industry = [],
  onSelectIndustry,
  onDeselectIndustry,
  onClearIndustry,
}: {
  data: StoryCardProps[];
  endIndex?: number;
  needFilter?: boolean;
  industry?: string[];
  onSelectIndustry?: (_values: any) => void;
  onDeselectIndustry?: (_values: any) => void;
  onClearIndustry?: () => void;
}) => {
  return (
    <section className={styles.storiesSection} id={'stories'}>
      <div className={'storiesSectionHeader'}>
        <div className={styles.title}>{i18n('solvea.Case_Collection_Title2')}</div>
        <div
          className={cx(styles.desc, {
            [styles.withFilter]: needFilter,
          })}
        >
          {i18n('solvea.Case_Collection_Desc2')}
        </div>
      </div>
      {needFilter && (
        <>
          <div className={styles.filterContainer}>
            <div className={styles.selectWrapper}>
              <Select
                placeholder="Industry"
                className={styles.select}
                onSelect={onSelectIndustry}
                suffixIcon={<DownOutLinedIcon className={styles.selectArrow} />}
                value={'Industry'}
                options={[
                  { label: 'Home & Furniture', value: 'Home & Furniture' },
                  { label: 'Consumer Electronics', value: 'Consumer Electronics' },
                  { label: 'Eyewear', value: 'Eyewear' },
                  { label: 'Financial Services', value: 'Financial Services' },
                  { label: 'Retail', value: 'Retail' },
                  { label: 'Automotive', value: 'Automotive' },
                ]}
              />
            </div>
            <div className={styles.clearAll} onClick={onClearIndustry}>
              <div className={styles.clearAllText}>Clear all</div>
            </div>
          </div>
          {industry.length > 0 && (
            <div className={styles.industryTags}>
              {industry.map((item) => (
                <div key={item} className={styles.industryTag}>
                  {item}{' '}
                  <CloseIcon
                    onClick={() => onDeselectIndustry?.(item)}
                    className={styles.closeIcon}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className={styles.row1}>
        {data[0] && (
          <div className={styles.big}>
            <StoryCard story={data[0]} className={styles.i1} />
            <a href={data[0].moreUrl} target={'_blank'} className={styles.buttonA}>
              <Button>GET STARTED</Button>
            </a>
          </div>
        )}
        {(data[1] || data[2]) && (
          <div className={styles.col2}>
            {data[1] && <StoryCard story={data[1]} className={styles.i2} />}
            {data[2] && <StoryCard story={data[2]} className={styles.i3} />}
          </div>
        )}
      </div>
      {data.slice(3, endIndex)?.length > 0 && (
        <>
          <Line className={styles.line} />
          <div className={styles.storiesGrid}>
            {data.slice(3, endIndex).map((story, index) => (
              <StoryCard
                story={story}
                key={index}
                type={'arrow'}
                className={`color-${index % 3}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
