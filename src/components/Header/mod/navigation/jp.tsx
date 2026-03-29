// import SvgSearchOutlined from 'components/Icons/SearchOutlined';
import styles from './index.module.scss';
// import SvgBook from 'components/Icons/Book';
// import SvgFacebookIcon from 'components/Icons/FacebookIcon';
// import SvgYouTube from 'components/Icons/YouTube';
// import SvgLinkedIn from 'components/Icons/LinkedIn';
// import SvgQuora from 'components/Icons/Quora';
// import SvgNavChatbot from 'components/Icons/NavChatbot';
// import SvgNavVoc from 'components/Icons/NavVoc';

export default function () {
  const toolsOptions = [
    {
      name: 'AmazonのChatGPT',
      href: 'https://www.voc.ai/jp/tools/chatgpt-for-amazon',
      logo: (
        <img
          src="https://cdn.shulex-voc.com/assets/1701316900927/chatgpt.png"
          loading="lazy"
          className={styles.icon}
          alt="chatgpt"
        />
      ),
    },
    {
      name: 'ワードクラウド',
      href: 'https://www.voc.ai/jp/tools/wordcloud',
      logo: (
        <img
          src="https://cdn.shulex-voc.com/assets/1701316900927/wordcloud.png"
          loading="lazy"
          className={styles.icon}
          alt="wordcloud"
        />
      ),
    },
    {
      name: 'AIリスティング',
      href: 'https://www.voc.ai/jp/tools/ai-listing',
      logo: (
        <img
          src="https://cdn.shulex-voc.com/assets/1701316900927/aiListing.png"
          loading="lazy"
          alt="aiListing"
          className={styles.icon}
        />
      ),
    },
  ];
  // const blogsOptions = [
  //   {
  //     name: '商品探しから店舗運営までをサポートするAmazon Seller ChatGPTツール',
  //     href: 'https://www.voc.ai/jp/blog/amazon-seller-chatgpt-tool-to-help-you-from-finding-products-to-store-operations',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'WordCloudのパワーを解き放つ。ShulexVOCでデータを美しいインサイトに変える - 顧客フィードバックの無料データ可視化および分析',
  //     href: 'https://www.voc.ai/jp/blog/unleash-the-power-of-wordcloud',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'センチメント分析の威力を知る。包括的なガイド',
  //     href: 'https://www.voc.ai/jp/blog/discover-the-power-of-sentiment-analysis-a-comprehensive-guide-jp',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'フィードバック分析の力を解き放つ。フィードバック分析があなたのビジネスにもたらす違いとは!',
  //     href: 'https://www.voc.ai/jp/blog/feedback-analysis-jp',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Chat GPTでAIの会話力を引き出す!',
  //     href: 'https://www.voc.ai/jp/blog/bring-out-ais-conversational-skills-with-chatgpt',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'シックスシグマで顧客の声（VOC）分析の効果を引き出す',
  //     href: 'https://www.voc.ai/jp/blog/leverage-the-power-of-voice-of-the-customer-analysis-with-six-sigma',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'More',
  //     href: 'https://www.voc.ai/jp/blog',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgBook className={styles.icon} />
  //       </div>
  //     ),
  //   },
  // ];

  // const communityOptions: NavData[] = [
  //   {
  //     name: 'Facebook Group',
  //     href: 'https://www.facebook.com/profile.php?id=100064724741685',
  //     logo: <SvgFacebookIcon className={styles.icon} />,
  //   },
  //   {
  //     name: 'YouTube Channel',
  //     href: 'https://www.youtube.com/channel/UC8g59jmpT19YgQ2_9vh3nKQ',
  //     logo: <SvgYouTube className={styles.icon} />,
  //   },
  //   {
  //     name: 'Twitter',
  //     href: 'https://twitter.com/VOC_ai',
  //     logo: (
  //       <img
  //         src="https://cdn.shulex-voc.com/assets/1701863131012/twitterX.png"
  //         alt="Twitter"
  //         title="Twitter"
  //         className={styles.icon}
  //         style={{ borderRadius: 0 }}
  //       />
  //     ),
  //   },
  //   {
  //     name: 'Linkedin',
  //     href: 'https://www.linkedin.com/company/shulex/posts/?feedView=all',
  //     logo: <SvgLinkedIn className={styles.icon} />,
  //   },
  //   {
  //     name: 'TikTok Channel',
  //     href: 'https://www.tiktok.com/@shulex.voc',
  //     logo: (
  //       <img
  //         src="https://cdn.shulex-voc.com/assets/1701323860111/tiktok.png"
  //         loading="lazy"
  //         className={styles.icon}
  //       />
  //     ),
  //   },
  //   {
  //     name: 'Quroa',
  //     href: 'https://www.quora.com/profile/Shulex-VOC',
  //     logo: <SvgQuora className={styles.icon} />,
  //   },
  //   // {
  //   //   name: 'Instagram',
  //   //   href: 'https://www.instagram.com/shulex_voc/',
  //   // },
  // ];
  // const features = [
  //   {
  //     name: 'AI エージェント',
  //     href: `/jp/product/ai-chatbot`,
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgNavChatbot className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'VOC アナリティクス',
  //     href: '/jp/product/voice-of-customer-analysis',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgNavVoc className={styles.icon} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Shulexマーケットインサイト',
  //     href: 'https://www.voc.ai/jp/market-insight',
  //     logo: (
  //       <div className={styles.iconContainer}>
  //         <SvgSearchOutlined className={cx(styles.icon, styles.blueIcon)} />
  //       </div>
  //     ),
  //   },
  //   {
  //     name: 'Shulex ChatbotGPT',
  //     href: 'https://www.voc.ai/page/jp/chatgpt-for-customer-service',
  //     logo: (
  //       <img
  //         src="https://cdn.shulex-voc.com/assets/1701316900927/chatgpt.png"
  //         loading="lazy"
  //         className={styles.icon}
  //       />
  //     ),
  //   },
  // ];
  return [
    // { name: '商品', children: features },
    { name: 'ツール', children: toolsOptions },
    // { name: 'ブログ', children: blogsOptions },
    // { name: 'ソーシャルメデイア', children: communityOptions },
    // { name: '料金プラン', href: '/jp/pricing' },
    { name: 'Customer Stories', href: '/jp/customer-stories' },
  ];
}
