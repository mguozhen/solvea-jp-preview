import React, { useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import i18n, { useI18n } from 'util/i18nOld/i18nOld';
import { ArrowRight } from 'components/Icons';
import Chat from './mod/Chat';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

interface Props extends BaseCSSProps {
  username?: string;
  avatar?: string;
  content?: any;
}

export default function ChatList(props: Props) {
  const { className, style } = props;
  const carouselRef = useRef<CarouselRef>(null);
  const { locale } = useI18n();
  const isEN = locale === 'en-US';
  return (
    <>
      <div className={cx(styles.container, className)} style={style}>
        <div className={styles.listContainer}>
          <div className={styles.list}>
            <Chat
              username="You"
              content={i18n('homepage.site.tabs.copilot.userChat1')}
              avatar="https://cdn.shulex-voc.com/assets/1682231995793/OperationPromotion2.png"
              isUser
            />
            <Chat
              username="VOC AI"
              content={`<span>${i18n(
                'homepage.site.tabs.copilot.shulexChat1',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat1.png' alt='data' title='data'/>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682231995793/OperationPromotion2.png"
              content={i18n('homepage.site.tabs.copilot.userChat2')}
            />
            <Chat
              username="VOC AI"
              content={`<span>${i18n(
                'homepage.site.tabs.copilot.shulexChat2',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat2.png' alt='data' title='data'/>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682231995793/OperationPromotion2.png"
              content={i18n('homepage.site.tabs.copilot.userChat3')}
            />
          </div>
          <div className={styles.list}>
            <Chat
              username="VOC AI"
              content={`<span> <span style="color:#2A85FF;">@Steven</span> ${i18n(
                'homepage.site.tabs.copilot.shulexChat3',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat3.png' alt='data' title='data'/>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682232048437/productDevelopment2.png"
              content={i18n('homepage.site.tabs.copilot.userChat4')}
            />
            <Chat
              username="VOC AI"
              content={
                isEN
                  ? `<span>These 5 Bluetooth earphones saw an increase in sales due to their support for <span style="font-weight:600;">VR devices, battery life of over 8 hours</span>, and noise reduction features. User purchase motivation was influenced by <span style="font-weight:600;">discounts</span>, and <span style="font-weight:600;">common username feedback</span> mentioned certain strengths and weaknesses of the products.</span>`
                  : i18n('homepage.site.tabs.copilot.shulexChat4')
              }
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682232048437/productDevelopment2.png"
              content={i18n('homepage.site.tabs.copilot.userChat5')}
            />
          </div>
          <div className={styles.list}>
            <Chat
              username="VOC AI"
              content={`<div><span style="color:#2A85FF;">@Steven</span> ${i18n(
                'homepage.site.tabs.copilot.shulexChat5.l1',
              )}<span style="color:#2A85FF;"> ${i18n(
                'homepage.site.tabs.copilot.shulexChat5.l2',
              )}</span>.</div>
          <div>${i18n('homepage.site.tabs.copilot.shulexChat5.l3')}<br/>
          <ul>
          <li>${i18n('homepage.site.tabs.copilot.shulexChat5.l4')}</li>
          <li>${i18n('homepage.site.tabs.copilot.shulexChat5.l5')}</li>
          <li>${i18n('homepage.site.tabs.copilot.shulexChat5.l6')}/li>
          </ul></div>
          <div>
          ${i18n(
            'homepage.site.tabs.copilot.shulexChat5.l7',
          )}<br/><span style="color:#2A85FF;"> ${i18n(
            'homepage.site.tabs.copilot.shulexChat5.Amazon',
          )}</span> <br/><span style="color:#2A85FF;"> ${i18n(
            'homepage.site.tabs.copilot.shulexChat5.Walmart',
          )}</span> <br/> <span style="color:#2A85FF;">${i18n(
            'homepage.site.tabs.copilot.shulexChat5.Shopify',
          )}</span> <br/> ${i18n('homepage.site.tabs.copilot.shulexChat5.l8')}
          </div>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682232070042/customerService2.png"
              content={i18n('homepage.site.tabs.copilot.userChat6')}
            />
            <Chat
              username="VOC AI"
              content={`<span>${i18n(
                'homepage.site.tabs.copilot.shulexChat6',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat4.png' alt='data' title='data'/>`}
            />
          </div>
        </div>
      </div>
      {/* 窄屏轮播 */}
      <div className={styles.carouselContainer}>
        <Carousel className={styles.carousel} ref={carouselRef}>
          <div className={styles.list}>
            <Chat
              username="You"
              content={i18n('homepage.site.tabs.copilot.userChat1')}
              avatar="https://cdn.shulex-voc.com/assets/1682231995793/OperationPromotion2.png"
              isUser
            />
            <Chat
              username="VOC AI"
              content={`<span>${i18n(
                'homepage.site.tabs.copilot.shulexChat1',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat1.png' alt='data' title='data'/>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682231995793/OperationPromotion2.png"
              content={i18n('homepage.site.tabs.copilot.userChat2')}
            />
            <Chat
              username="VOC AI"
              content={`<span>${i18n(
                'homepage.site.tabs.copilot.shulexChat2',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat2.png' alt='data' title='data'/>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682231995793/OperationPromotion2.png"
              content={i18n('homepage.site.tabs.copilot.userChat3')}
            />
          </div>
          <div className={styles.list}>
            <Chat
              username="VOC AI"
              content={`<span> <span style="color:#2A85FF;">@Steven</span> ${i18n(
                'homepage.site.tabs.copilot.shulexChat3',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat3.png' alt='data' title='data'/>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682232048437/productDevelopment2.png"
              content={i18n('homepage.site.tabs.copilot.userChat4')}
            />
            <Chat
              username="VOC AI"
              content={
                isEN
                  ? `<span>These 5 Bluetooth earphones saw an increase in sales due to their support for <span style="font-weight:600;">VR devices, battery life of over 8 hours</span>, and noise reduction features. User purchase motivation was influenced by <span style="font-weight:600;">discounts</span>, and <span style="font-weight:600;">common username feedback</span> mentioned certain strengths and weaknesses of the products.</span>`
                  : i18n('homepage.site.tabs.copilot.shulexChat4')
              }
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682232048437/productDevelopment2.png"
              content={i18n('homepage.site.tabs.copilot.userChat5')}
            />
          </div>
          <div className={styles.list}>
            <Chat
              username="VOC AI"
              content={`<div><span style="color:#2A85FF;">@Steven</span> ${i18n(
                'homepage.site.tabs.copilot.shulexChat5.l1',
              )}<span style="color:#2A85FF;"> ${i18n(
                'homepage.site.tabs.copilot.shulexChat5.l2',
              )}</span>.</div>
          <div>${i18n('homepage.site.tabs.copilot.shulexChat5.l3')}<br/>
          <ul>
          <li>${i18n('homepage.site.tabs.copilot.shulexChat5.l4')}</li>
          <li>${i18n('homepage.site.tabs.copilot.shulexChat5.l5')}</li>
          <li>${i18n('homepage.site.tabs.copilot.shulexChat5.l6')}/li>
          </ul></div>
          <div>
          ${i18n(
            'homepage.site.tabs.copilot.shulexChat5.l7',
          )}<br/><span style="color:#2A85FF;"> ${i18n(
            'homepage.site.tabs.copilot.shulexChat5.Amazon',
          )}</span> <br/><span style="color:#2A85FF;"> ${i18n(
            'homepage.site.tabs.copilot.shulexChat5.Walmart',
          )}</span> <br/> <span style="color:#2A85FF;">${i18n(
            'homepage.site.tabs.copilot.shulexChat5.Shopify',
          )}</span> <br/> ${i18n('homepage.site.tabs.copilot.shulexChat5.l8')}
          </div>`}
            />
            <Chat
              username="You"
              isUser
              avatar="https://cdn.shulex-voc.com/assets/1682232070042/customerService2.png"
              content={i18n('homepage.site.tabs.copilot.userChat6')}
            />
            <Chat
              username="VOC AI"
              content={`<span>${i18n(
                'homepage.site.tabs.copilot.shulexChat6',
              )}</span>
          <img loading="lazy" src='https://cdn.shulex-voc.com/assets/1683884516377/chat4.png' alt='data' title='data'/>`}
            />
          </div>
        </Carousel>
        <div className={styles.changeBtn}>
          <ArrowRight
            className={styles.icon}
            style={{ transform: 'rotate(180deg)' }}
            onClick={() => {
              carouselRef.current && carouselRef.current.prev();
            }}
          />
          <ArrowRight
            className={styles.icon}
            onClick={() => {
              carouselRef.current?.next();
            }}
          />
        </div>
      </div>
    </>
  );
}
