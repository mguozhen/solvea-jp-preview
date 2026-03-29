import styles from './index.module.scss';
import React from 'react';
import cx from 'classnames';
import Markdown from '../Markdown';

interface Props {
  message: {
    role: 'user' | 'assistant' | 'system';
    content: string | React.ReactNode;
  };
}

export default function MessageItem({ message }: Props) {
  const { role, content } = message;
  return (
    <div className={styles.container}>
      <div className={cx(styles.content, styles[role])}>
        <Markdown content={content as string} />
      </div>
    </div>
  );
}
