import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { ShulexCat } from 'components/Icons';

interface Props extends BaseCSSProps {
  username?: string;
  avatar?: string;
  content?: any;
  time?: string;
  isUser?: boolean;
}

export default function Chat(props: Props) {
  const { className, style, username, avatar, content, time, isUser } = props;

  return (
    <div
      className={cx(styles.container, className, {
        [styles.end]: username === 'You',
        [styles.start]: username !== 'You',
      })}
      style={style}
      data-aos-offset="100"
      data-aos={isUser ? 'fade' : 'zoom-in'}
    >
      <div
        className={styles.avatar}
        style={username === 'You' ? { order: 1 } : {}}
      >
        {username !== 'You' && (
          <div className={styles.icons}>
            <ShulexCat className={styles.icon} />
          </div>
        )}
        {username === 'You' && (
          <img
            src={avatar}
            alt="user-avatar"
            title="user-avatar"
            loading="lazy"
            className={styles.icon}
          />
        )}
        {username !== 'You' && <div className={styles.online}></div>}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <div
            className={styles.username}
            style={
              username === 'You' ? { fontWeight: 700 } : { fontWeight: 500 }
            }
          >
            {username}
          </div>
          <div className={styles.date}>
            {time}
          </div>
        </div>
        <div
          className={cx(styles.box, {
            [styles.user]: username === 'You',
            [styles.shulex]: username !== 'You',
          })}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
}
