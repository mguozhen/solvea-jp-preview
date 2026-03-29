import React from 'react';
import styles from './index.module.scss';
import Card, { CardProps } from './mod/Card';
import Section from '../Section';

interface Props {
  title?: string;
  subTitle?: string;
  cards?: CardProps[];
}

/**
 * @param props
 * @returns
 */
export default function Cards(props: Props) {
  const { title, subTitle, cards } = props;
  return (
    <Section
      classname={styles.sectionBack}
      subTitleClass={styles.secSubTitle}
      title={title}
      subTitle={subTitle}
    >
      <div className={styles.cards}>
        {Array.isArray(cards) &&
          cards?.map((item, index) => {
            return <Card {...item} key={index} />;
          })}
      </div>
    </Section>
  );
}
