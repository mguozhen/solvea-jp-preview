import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import {
  Blocks,
  Cons,
  Lines,
  Man,
  Note,
  Profile,
  Shop,
  Thumb,
  Usage,
  Woman,
} from 'components/Icons';

interface Props extends BaseCSSProps {
  title?:
    | 'Customer Profile'
    | 'Pros'
    | 'Cons'
    | 'Usage Scenario'
    | 'Customer Expectation'
    | 'Purchase Motivations';
  topics?: string[];
  percent?: string[];
  reasons?: string[];
  who?: string[];
  when?: string[];
  where?: string[];
  what?: string[];
  icon?: any;
  customerProfile?: boolean;
}

const iconMap = {
  'Customer Profile': <Profile className={styles.icon} />,
  Pros: <Thumb className={styles.icon} />,
  Cons: <Cons className={styles.icon} />,
  'Usage Scenario': <Usage className={styles.icon} />,
  'Customer Expectation': <Note className={styles.icon} />,
  'Purchase Motivations': <Shop className={styles.icon} />,
};

export default function ExtensionCard(props: Props) {
  const {
    className,
    style,
    title,
    topics,
    percent,
    reasons,
    what,
    when,
    where,
    who,
    customerProfile,
  } = props;
  return (
    <div
      className={cx(styles.container, className)}
      data-aos="zoom-in"
      style={style}
    >
      <div className={styles.header}>
        {/* <Usage className={styles.icon} /> */}
        {iconMap[title || '']}
        <span className={styles.title}>{title}</span>
      </div>
      {customerProfile && (
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.people}>
              <Man className={styles.icon} />
              <Woman className={styles.icon} />
            </div>
            <Lines className={styles.line} />
          </div>
          <div className={styles.bottom}>
            <div className={styles.item2}>
              {Array.isArray(who) &&
                who.map((item, index) => {
                  return (
                    <div
                      className={styles.itemInner}
                      key={'who' + item}
                      style={
                        index === 0 ? { fontWeight: 700 } : { fontWeight: 400 }
                      }
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
            <div className={styles.item2}>
              {Array.isArray(when) &&
                when.map((item, index) => {
                  return (
                    <div
                      className={styles.itemInner}
                      key={'when' + item}
                      style={
                        index === 0 ? { fontWeight: 700 } : { fontWeight: 400 }
                      }
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
            <div className={styles.item2}>
              {Array.isArray(where) &&
                where.map((item, index) => {
                  return (
                    <div
                      className={styles.itemInner}
                      key={'where' + item}
                      style={
                        index === 0 ? { fontWeight: 700 } : { fontWeight: 400 }
                      }
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
            <div className={styles.item2}>
              {Array.isArray(what) &&
                what.map((item, index) => {
                  return (
                    <div
                      className={styles.itemInner}
                      key={'what' + item}
                      style={
                        index === 0 ? { fontWeight: 700 } : { fontWeight: 400 }
                      }
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {!customerProfile && (
        <div className={styles.content}>
          <div className={styles.names}>
            <div className={styles.left}>
              <div className={styles.topic}>Topic</div>
              <div className={styles.percent}>Percent</div>
            </div>
            <div className={styles.reason}>
              <span>Reason</span>
              <Blocks className={styles.icon} />
            </div>
          </div>
          {Array.isArray(topics) &&
            topics.map((item, index) => {
              return (
                <div key={'topic' + item}>
                  <div className={styles.item}>
                    <div className={styles.left}>
                      <div className={styles.topic}>{item}</div>
                      <div className={styles.percent}>
                        {Array.isArray(percent) && percent[index]}
                      </div>
                    </div>
                    <div className={styles.reason}>
                      {Array.isArray(reasons) && reasons[index]}
                    </div>
                  </div>
                  <div className={cx(styles.item, styles.hide)} key={index}>
                    <div className={styles.reason}>
                      {Array.isArray(reasons) && reasons[index]}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
