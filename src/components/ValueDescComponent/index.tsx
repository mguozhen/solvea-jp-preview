import { noMarginComponentList } from '@/constant/common';
import cx from 'classnames';
import { pick } from 'lodash';
import dynamic from 'next/dynamic';
import SolveaSmallBrands from 'pages/mod/SolveaSmallBrands';
import React, { useMemo } from 'react';
import AllInOne from '../../app/mod/AllInOne';
import Community from '../../app/mod/CommunitySay';
import ConsumerBlock from '../../app/mod/ConsumerBlock';
import GetStart from '../../app/mod/GetStart';
import SecurityAutomation from '../../app/mod/SecurityAutomation';
import SolveaSkill from '../../app/mod/SolveaSkill';
import SupportPlatfoem from '../../app/mod/SupportPlatform';
import ThinkWork from '../../app/mod/ThinkWork';
import Blogs from './Blogs';
import Cards from './Cards';
import Carousel2 from './Carousel2';
import Compare from './Compare';
import Container from './Container';
import FirstPage from './FirstPage';
import Hero from './Hero';
import HomeFirstBlock from './HomeFirstBlock';
import HomeInAppPopupBlock from './HomeInAppPopupBlock';
import HomeTopBannerBlock from './HomeTopBannerBlock';
import Iframe from './Iframe';
import ImageBlock from './ImageBlock';
import styles from './index.module.scss';
import MediaReports from './MediaReports';
import Solutions from './Solutions';
import SolveaAgent from './SolveaAgent/Agent';
import SolveaAudio from './SolveaAudio';
import SolveaBigBrands from './SolveaBigBrands';
import SolveaBlock from './SolveaBlock';
import SolveaBottomCTA from './SolveaBottomCTA';
import SolveaCard from './SolveaCard';
import SolveaChannelConnect from './SolveaChannelConnect';
import SolveaChart from './SolveaChart';
import SolveaLtdPricing from './SolveaLtdPricing';
import SolveaComparisionHighlight from './SolveaComparisionHighlight';
import SolveaComparisonTable from './SolveaComparisonTable';
import SolveaCustomerTestimonial from './SolveaCustomerTestimonial';
import SolveaFirstPage from './SolveaFirstPage';
import SolveaHero from './SolveaHero';
import SolveaHighlightIndices from './SolveaHighlightIndices';
import SolveaHowItWorks from './SolveaHowItWorks';
import SolveaIndustrySolutionsGrid from './SolveaIndustrySolutionsGrid';
import SolveaInsightsView from './SolveaInsightsView';
import SolveaIntegrationShowcase from './SolveaIntegrationShowcase';
import SolveaKeyMetrics from './SolveaKeyMetrics';
import SolveaLivePreview from './SolveaLivePreview';
import SolveaPoster from './SolveaPoster';
import SolveaSolutionsOverview from './SolveaSolutionsOverview';
import SolveaSubscribe from './SolveaSubscribe';
import SolveaValueProposition from './SolveaValueProposition';
import SolveaValuePropositionGrid from './SolveaValuePropositionGrid';
import SolveaWaitlist from './SolveaWaitlist';
import Space from './Space';
import Steps from './Steps';
import TitleBanner from './TitleBanner';
import TitleText from './TitleText';
import Topic from './Topic';

/** 首屏外 Home 区块懒加载，减小主包体积、降低 TBT，SSR 保留避免布局偏移 */
const HomeEasyToUseBlock = dynamic(() => import('./HomeEasyToUseBlock'), { ssr: true });
const HomeFAQBlock = dynamic(() => import('./HomeFAQBlock'), { ssr: true });
const HomeHowItWorksBlock = dynamic(() => import('./HomeHowItWorksBlock'), { ssr: true });
const HomeIntegrationBlock = dynamic(() => import('./HomeIntegrationBlock'), { ssr: true });
const HomeSetupBlock = dynamic(() => import('./HomeSetupBlock'), { ssr: true });
const HomeTemplatesBlock = dynamic(() => import('./HomeTemplatesBlock'), { ssr: true });
const HomeTestimonialsBlock = dynamic(() => import('./HomeTestimonialsBlock'), { ssr: true });

const registerMap = {
  Container,

  AllInOne,
  ConsumerBlock,
  SolveaSkill,
  ThinkWork,
  SupportPlatfoem,
  SecurityAutomation,
  Community,
  GetStart,
  FirstPage,
  SolveaSmallBrands,
  SolveaBigBrands,
  TitleText,
  Hero,
  Space,
  Topic,
  Iframe,
  ImageBlock,
  Cards,
  Steps,
  Blogs,
  Compare,
  TitleBanner,
  Solutions,
  SolveaChart,
  SolveaLtdPricing,
  SolveaPoster,
  SolveaHero,
  SolveaCard,
  SolveaBlock,
  SolveaBottomCTA,
  MediaReports,
  Carousel2,
  SolveaAudio,
  SolveaComparisionHighlight,
  SolveaCustomerTestimonial,
  SolveaHighlightIndices,
  SolveaComparisonTable,
  SolveaAgent,
  SolveaFirstPage,
  SolveaValueProposition,
  SolveaKeyMetrics,
  SolveaLivePreview,
  SolveaHowItWorks,
  SolveaIndustrySolutionsGrid,
  SolveaInsightsView,
  SolveaIntegrationShowcase,
  SolveaSolutionsOverview,
  SolveaValuePropositionGrid,
  SolveaWaitlist,
  SolveaSubscribe,
  SolveaChannelConnect,
  HomeInAppPopupBlock,
  HomeFirstBlock,
  HomeTopBannerBlock,
  HomeSetupBlock,
  HomeTemplatesBlock,
  HomeEasyToUseBlock,
  HomeTestimonialsBlock,
  HomeIntegrationBlock,
  HomeHowItWorksBlock,
  HomeFAQBlock,
};

interface Props {
  className?: string;
  type?: string;
  props?: any;
  subComponents?: Props[];
  uuid?: string;
  index?: number;
  hide?: boolean;
  renderWrapper?: (_comp: React.ReactNode, _schema: any, _index: number) => React.ReactNode;
  isUaMobile?: boolean; // 根据header里的ua判断是否为移动端 可在组件内获取
  isHeader?: boolean;
  theme?: 'dark' | 'light';
}

const Render: React.FC<Props> = (props) => {
  const {
    className,
    type,
    props: dataProps,
    uuid,
    subComponents,
    renderWrapper,
    isUaMobile,
    index,
    isHeader,
    theme = 'light',
  } = props;

  const renderComp = useMemo(() => {
    const C = registerMap[type as string];
    if (!C || type === 'Container') {
      return null;
    }

    if (renderWrapper) {
      const targetProps = pick(props, ['type', 'subComponents', 'props', 'uuid']);
      const comp =
        type === 'Container' ? (
          <C
            className={cx(className, styles.marginAuto)}
            {...dataProps}
            key={uuid}
            isUaMobile={isUaMobile}
            theme={theme}
            data-component-type={type}
          />
        ) : (
          <div
            className={cx(
              noMarginComponentList.includes(type as string)
                ? styles.compWrapperNoPadding
                : styles.compWrapper,
            )}
            style={{
              background: dataProps?.backgroundColor,
              ...(dataProps?.backgroundImage
                ? { backgroundImage: `url(${dataProps?.backgroundImage})` }
                : {}),
              ...dataProps?.defaultStyle,
            }}
            data-component-type={type}
          >
            <C
              className={cx(className, styles.marginAuto)}
              {...dataProps}
              theme={theme}
              isUaMobile={isUaMobile}
            />
          </div>
        );
      return renderWrapper(comp, targetProps, index as number) as JSX.Element;
    }

    return (
      <div
        className={cx(
          noMarginComponentList.includes(type as string)
            ? styles.compWrapperNoPadding
            : styles.compWrapper,
        )}
        style={{
          background: dataProps?.backgroundColor,
          ...(dataProps?.backgroundImage
            ? { backgroundImage: `url(${dataProps?.backgroundImage})` }
            : {}),
          ...dataProps?.defaultStyle,
        }}
        data-component-type={type}
      >
        <C
          className={cx(className, styles.marginAuto)}
          {...dataProps}
          theme={theme}
          isUaMobile={isUaMobile}
        />
      </div>
    );
  }, [type, className, dataProps, uuid, isUaMobile, theme, renderWrapper, index, props]);

  if (type === 'Container') {
    const { type: containerType } = dataProps || {};
    const ret = (
      <Container
        className={cx(className, styles.container, {
          [styles.horizontal]: containerType === 'horizontal',
          [styles.start]: isHeader,
          [styles.light]: theme === 'light',
          [styles.dark]: theme === 'dark',
        })}
        {...dataProps}
        data-component-type={type}
      >
        {subComponents?.map((sub, idx) => {
          const { type, props: pps, subComponents: sc, uuid: uu, hide } = sub;
          if (hide) return null;
          return (
            <Render
              key={idx}
              className={styles.gap}
              type={type}
              props={pps}
              subComponents={sc}
              uuid={uu}
              index={idx}
              renderWrapper={renderWrapper}
              isUaMobile={isUaMobile}
              theme={theme}
            />
          );
        })}
      </Container>
    );
    if (renderWrapper) {
      const targetProps = pick(props, ['type', 'subComponents', 'props', 'uuid']);
      return renderWrapper(ret, targetProps, index as number) as JSX.Element;
    }
    return ret;
  }
  return renderComp;
};

export default Render;
