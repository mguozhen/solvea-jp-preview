import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

/**
 * 卡片包裹组件
 * @param props
 * @param props.type 卡片类型，必传，默认值为'default'
 * @param props.children 子组件，必传
 * @param props.cardItemProps 卡片项属性
 * @param props.topContent 顶部内容，必传
 */
interface Props {
  children: React.ReactNode;
  cardItemProps?: React.HTMLAttributes<HTMLDivElement>;
  topContent?: React.ReactNode;
  type?: 'default' | 'numberCard' | 'textCard';
}

export default function SolveaCardWrapper(props: Props) {
  const { type = 'default', children, cardItemProps = {}, topContent } = props;

  if (!children) return null;

  if (type === 'numberCard') {
    return (
      <div className={styles.numberCardItemWrapper}>
        <div className={styles.cardItemIndex}>{topContent}</div>
        <div className={styles.cardItem} {...cardItemProps}>
          {children}
        </div>
      </div>
    );
  }

  if (type === 'textCard') {
    return (
      <div
        className={cx(styles.numberCardItemWrapper, styles.textCardItemWrapper)}
      >
        <div className={styles.cardItemIndex}>{topContent}</div>
        <div className={styles.cardItem} {...cardItemProps}>
          {children}
        </div>
        <div className={cx(styles.cardItemIndex, styles.cardItemIndexBottom)} />
      </div>
    );
  }

  return (
    <div className={styles.defaultCardItemWrapper} {...cardItemProps}>
      {children}
    </div>
  );
}
