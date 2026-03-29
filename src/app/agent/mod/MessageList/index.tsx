import React from 'react';
import MessageItem from '../MessageItem';
import styles from './index.module.scss';
import Markdown from '../Markdown';
import cx from 'classnames';
interface Props {
  messages: any[];
  loading?: boolean;
  streamLoading?: boolean;
  streamMessage?: string;
  role?: 'user' | 'assistant' | 'system';
  type?: 'voice' | 'chat';
}
export default function MessageList(props: Props) {
  const { messages, loading, streamLoading, streamMessage, role, type } = props;
  return (
    <div className={styles.container}>
      {messages.map((item, index) => (
        <MessageItem key={index} message={item} />
      ))}
      {loading && !streamMessage && (
        <div className={styles.content}>
          <div className={styles.loadingDots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        </div>
      )}
      {streamMessage && (
        <div
          className={cx(styles.content, {
            [styles.userContent]: role === 'user',
          })}
        >
          {type === 'voice' ? (
            streamMessage
          ) : (
            <Markdown
              content={streamMessage}
              className={styles.streamMessage}
            />
          )}
          {type === 'voice' && streamLoading && (
            <span className={styles.streamMessageIcon}></span>
          )}
        </div>
      )}
    </div>
  );
}
