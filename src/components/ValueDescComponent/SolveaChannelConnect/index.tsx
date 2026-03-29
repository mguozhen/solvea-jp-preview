import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageSquareIcon } from './firstSvg';
import styles from './index.module.scss';
import { PhoneIcon } from './secondSvg';
import { MailIcon } from './threeSvg';

interface Props {
  title: string;
  description: string;
  channelList: {
    name: string;
    icon: string;
    description: string;
    href: string;
  }[];
  startModel: {
    title: string;
    description: string;
    buttonList: { text: string; href: string; btnType: 'default' | 'text' }[];
  };
}


// 图标映射和颜色配置
const iconConfig: Record<string, { Icon: any; color: string; bgColor: string }> = {
  chat: {
    Icon: MessageSquareIcon,
    color: '#FF6B4A',
    bgColor: 'rgba(255, 107, 74, 0.082)',
  },
  phone: {
    Icon: PhoneIcon,
    color: '#7C5CFF',
    bgColor: 'rgba(124, 92, 255, 0.082)',
  },
  mail: {
    Icon: MailIcon,
    color: '#4ECDC4',
    bgColor: 'rgba(78, 205, 196, 0.082)',
  },
};

export default function SolveaChannelConnect(props: Props) {
  const { title, description, channelList, startModel } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.channelGrid}>
        {channelList?.map((channel, index) => {
          const config = iconConfig[channel.icon] || iconConfig.chat;
          const { Icon, color, bgColor } = config;

          return (
            <a key={index} href={channel.href} className={styles.channelCard}>
              <div className={styles.iconWrapper} style={{ backgroundColor: bgColor }}>
                <div className={styles.icon}>
                  <Icon color={color} />
                </div>
              </div>
              <h3 className={styles.channelName}>{channel.name}</h3>
              <p className={styles.channelDesc}>{channel.description}</p>
            </a>
          );
        })}
      </div>

      {/* CTA Section */}
      {startModel && startModel.title && (
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>{startModel.title}</h2>
              <p className={styles.ctaDescription}>{startModel.description}</p>
              <div className={styles.ctaButtons}>
                {startModel.buttonList?.map((button, btnIndex) => (
                  <a
                    key={btnIndex}
                    href={button.href}
                    className={
                      button.btnType !== 'default'
                        ? styles.ctaButtonPrimary
                        : styles.ctaButtonSecondary
                    }
                  >
                    {button.text}
                    {button.btnType !== 'default' && <ArrowRightOutlined className={styles.arrowIcon} />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
