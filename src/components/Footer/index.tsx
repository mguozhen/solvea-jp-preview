import React from 'react';
import styles from './index.module.scss';
import {
  Amazon,
  Aws,
  FacebookSimple,
  LinkedInGray,
  QuoraGray,
  TiktokGray,
  TwitterSimple,
  YoutubeSimple,
} from 'components/Icons';
import ProductHunt from 'components/ProductHunt';
import LangSwap from 'components/LangSwap';
import i18n, { getLang } from '@/i18n';

const bottomLinks = [
  // { title: 'Robosell', href: 'https://robosell.com?utm_source=shulex' },
  // {
  //   title: 'Socialpoch',
  //   href: 'https://www.socialepoch.io/?utm_source=shulex',
  // },
  // { title: 'Erase.video', href: 'https://erase.video/?utm_source=shulex' },
  // {
  //   title: 'SellerSprite',
  //   href: 'https://www.sellersprite.com/en/?utm_source=shulex',
  // },
  // { title: 'PiPiADS', href: 'https://www.pipiads.com?utm_source=shulex' },
  // { title: 'ASINSIGHT', href: 'https://www.asinsight.ai/?source=shulex' },
  // { title: 'ChatGPT Free', href: 'https://www.chatgptfree.jp' },
  // { title: 'FBA Calculator', href: 'https://www.fbacalculator.org' },
  {
    title: i18n('layout.Home_Bottom_amazon_review_analysis'),
    href: 'https://www.voc.ai',
  },
];

export default function Footer() {
  // const [productUrl, setProductHuntUrl] = useState(
  //   'https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=423776&theme=dark&period=daily',
  // );
  const isCn = getLang() === 'zh-CN';
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <img
              className={styles.vocLogo}
              src="https://cdn.shulex-voc.com/shulex/upload/2025-07-16/dbc99063-decc-4e15-88e1-25ecd1d6f635.svg"
              alt=""
            />
            {/* <LogoText className={styles.vocLogo} /> */}
            {isCn && (
              <img
                src="https://cdn.shulex-voc.com/shulex/upload/2025-04-30/5b53cf94-f46f-4fbf-b655-e016f185d511.png"
                alt="qrcode"
                className={styles.qrCode}
              />
            )}
            <div className={styles.td}>
              <div className={styles.tl}>
                {i18n('layout.Solvea_Virtual_Agents')}
              </div>
              <div className={styles.tr}>
                {/* <div>(604) 555-5555</div> */}
                <a className={styles.link} href="mailto:support@voc.ai">
                  {getLang() === 'ja-JP'
                    ? 'support-jp@voc.ai'
                    : 'support@voc.ai'}
                </a>
                <LangSwap />
              </div>
            </div>
            {/* <div className={styles.lb}>
              <InstagramIcon className={styles.icon} />
              <Twitter className={styles.icon} />
              <Facebook className={styles.icon} />
            </div> */}
          </div>
          <div className={styles.right}>
            {/* <div className={styles.rt}>
              <a href="https://www.voc.ai/support" className={styles.link}>
                {i18n('layout.Home_Bottom_Support')}
              </a>
              <a href="https://www.voc.ai/blog" className={styles.link}>
                {i18n('layout.Home_Bottom_Blog')}
              </a>
            </div> */}
            <div className={styles.rm}>
              <div className={styles.brandsWrapper}>
                <a
                  href="https://www.vanta.com/integrations?built-by=Partner"
                  target="_blank"
                >
                  <img
                    className={styles.brand}
                    src="https://cdn.shulex-voc.com/assets/1697169674614/Vanta_trust.png"
                    alt="brand"
                  />
                </a>

                <a
                  href="https://www.producthunt.com/posts/vocai-chatbot?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-vocai&#0045;chatbot"
                  target="_blank"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=423776&theme=dark&period=daily"
                    // onError={() => {
                    //   setProductHuntUrl(
                    //     'https://cdn.shulex-voc.com/assets/1701852282314/product-footer.png',
                    //   );
                    // }}
                    alt="VocAI&#0032;Chatbot - Resolve&#0032;80&#0037;&#0032;of&#0032;your&#0032;customer&#0032;support&#0032;questions&#0032;with&#0032;no&#0032;code | Product Hunt"
                    className={styles.brand}
                  />
                </a>
                <Aws className={styles.brand} style={{ height: 18 }} />
                {/* <SvgGoogle className={styles.brand} style={{ height: 18 }} /> */}
                <Amazon className={styles.brand} style={{ height: 18 }} />
                <img
                  src="https://cdn.shulex-voc.com/assets/1704880693874/microsoft.png"
                  style={{ width: 100 }}
                  alt="microsoft"
                />
                <ProductHunt />
                <a
                  href={
                    isCn
                      ? 'https://www.cert-assure.com/serchresult.php?type=Management+System+Certification&certificate=CHI-I-270512+'
                      : 'https://www.cert-assure.com/serchresult.php?type=Management+System+Certification&certificate=USA-SOC2-220513'
                  }
                  target="_blank"
                >
                  <img
                    src="https://cdn.shulex-voc.com/assets/1718156690892/CAI_ISO_27001-2022_logo.jpg"
                    className={styles.brand}
                    alt="iso logo"
                    style={{ borderRadius: 100 }}
                  />
                </a>
                <a
                  href="https://www.asib.co.uk/certificate_search.php?common_search=CHI-I-270512&submit-form="
                  style={{ whiteSpace: 'nowrap' }}
                  target="_blank"
                >
                  <img
                    src="https://cdn.shulex-voc.com/assets/1718156690892/ASIB_Logo.jpg"
                    className={styles.brand}
                    alt="asiblogo"
                  />
                </a>
                <a
                  href="https://www.asib.co.uk/certificate_search.php?common_search=CHI-I-270512&submit-form="
                  style={{ whiteSpace: 'nowrap' }}
                  target="_blank"
                >
                  <img
                    src="https://cdn.shulex-voc.com/assets/1718156690892/ISO_Reg_Global_Logo.png"
                    className={styles.brand}
                    alt="iso logo"
                    style={{ borderRadius: 100 }}
                  />
                </a>
                <a
                  href={
                    isCn
                      ? 'https://www.cert-assure.com/serchresult.php?type=Management+System+Certification&certificate=CHI-SOC2-220512'
                      : 'https://www.cert-assure.com/serchresult.php?type=Management+System+Certification&certificate=USA-I-270513+'
                  }
                  target="_blank"
                >
                  <img
                    src="https://cdn.shulex-voc.com/assets/1718156690892/CAI_SOC_2_LOGO.jpg"
                    className={styles.brand}
                    alt="cai soc logo"
                    style={{ borderRadius: 100 }}
                  />
                </a>
              </div>
            </div>
            <div className={styles.rb}>
              <a
                href="https://www.voc.ai/terms-and-condition"
                className={styles.link}
              >
                {i18n('layout.Terms_of_Service')}
              </a>{' '}
              <a
                href="https://www.voc.ai/privacy-policy"
                className={styles.link}
              >
                {i18n('layout.Privacy_Policy')}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.medias}>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100064724741685"
            >
              <FacebookSimple className={styles.icon} />
            </a>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UC8g59jmpT19YgQ2_9vh3nKQ"
            >
              <YoutubeSimple className={styles.icon} />
            </a>
            <a target="_blank" href="https://twitter.com/VOC_ai">
              <TwitterSimple className={styles.icon} />
            </a>
            <a target="_blank" href="https://www.tiktok.com/@shulex.voc">
              <div className={styles.iconContainer}>
                <TiktokGray className={styles.iconBig} />
              </div>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/shulex/posts/?feedView=all"
            >
              <div className={styles.iconContainer}>
                <LinkedInGray className={styles.iconBig} />
              </div>
            </a>
            <a target="_blank" href="https://www.quora.com/profile/Shulex-VOC">
              <div className={styles.iconContainer}>
                <QuoraGray className={styles.iconBig} />
              </div>
            </a>
          </div>
          <div className={styles.bt}>
            VOC AI Inc. 160 E Tasman Drive Suite 202 San Jose, CA, 95134
            Copyright © 2025 VOC AI Inc. All Rights Reserved.
            {getLang() === 'zh-CN' && (
              <a
                className={styles.link}
                href="https://beian.miit.gov.cn/"
                style={{ marginLeft: 10, opacity: 1 }}
              >
                浙ICP备2022012057号-2
              </a>
            )}
          </div>
          <div className={styles.bb}>
            {i18n('layout.Home_Bottom_Link')}：
            {bottomLinks.map((item) => (
              <a key={item.href} className={styles.link} href={item.href}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
