import React from 'react';
import styles from './index.module.scss';
import BrandCarousel from 'components/BrandCarousel';
import OverviewNormal from 'components/OverviewNormal/page';
import PointsIntro from 'components/PointsIntro';
import CardIntro from 'components/CardIntro';
import BrandWall from 'components/BrandWall';
import {
  getSolutionsLabelMap,
  solutionsData,
  solutionsImageMap,
} from '@/constant/solutions';
import i18n, { langMap } from '@/i18n';
import { brandImageList } from '@/constant/common';
import GoogleFonts from 'components/GoogleFonts';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { headers } from 'next/headers';
import { getLink } from 'util/getLink';
import { Metadata } from 'next';
import LivechatDemo from 'components/LivechatDemo';
import { SLX_HOST } from 'util/services';
import { PUBLIC_PAGE_REVALIDATE, SITE } from '@/constant/base';
import { parseJSON, stringify } from 'shulex-util';
import { decodePathnameToCanonical, getPathNameLang } from 'util/common';
import { generateHrefLangConfig } from 'components/Header/mod/HrefLang';

export async function generateMetadata(
  { params },
): Promise<Metadata> {
  // read route params
  const headerList = headers();
  const rawPathname =
    headerList.get('voc-pathname') || `/solutions/${params.slug}`;
  const pathname = decodePathnameToCanonical(rawPathname);
  const currentLang = getPathNameLang(
    pathname,
    headerList.get('voc-host') as string,
  );
  // 去除语言前缀，保证查找的是 /solutions/xxx
  const purePath = pathname.replace(/^\/(cn|jp|fr|pt|es|de)(?=\/)/, '');

  const dataRes = await fetch(
    `${SLX_HOST}/n/blog/detailData?${stringify({
      slug: encodeURIComponent(
        `${params.slug}_${langMap[currentLang] ?? 'en'}`,
      ),
      site: process.env.SITE || SITE,
      status: 'publish,draft',
    })}`,
    {
      credentials: 'include',
      next: { revalidate: PUBLIC_PAGE_REVALIDATE },
    },
  );
  const blogSlugRes = dataRes ? ((await dataRes.json()) as any) : {};
  const data = blogSlugRes?.data?.[0] ?? {};
  const title = data?.meta?.title;
  const desc = data?.meta?.desc;

  return {
    title: title ?? i18n('layout.Solution_Meta_Title'),
    description: desc ?? i18n('layout.Solution_Meta_Desc'),
    alternates: generateHrefLangConfig(purePath, currentLang),
  };
}

async function getData(slug, lang) {
  try {
    const blogRes = await fetch(
      `${SLX_HOST}/n/blog/detailData?${stringify({
        slug: encodeURIComponent(`${slug}_${lang}`),
        site: SITE,
        status: 'publish,draft',
      })}`,
      {
        credentials: 'include',
        next: { revalidate: PUBLIC_PAGE_REVALIDATE },
      },
    );
    const blogData = await blogRes.json();
    return parseJSON(blogData?.data?.[0]?.post_content);
    // const targetData = (solutionsData[lang] ?? solutionsData['en-US'])?.find(
    //   (v) => v.slug === slug,
    // );
    // return targetData;
  } catch (error) {}
}

export default async function Solutions(props) {
  const { params } = props;
  const headerList = headers();
  const lang = headerList.get('voc-lang');
  const { slug } = await params;
  const data = await getData(slug, lang);
  const solutionsLabelMap = getSolutionsLabelMap(lang);
  const industryText = solutionsLabelMap?.[slug];
  const livechatData = solutionsData['en-US']?.find((v) => v.slug === slug);

  return (
    <div className={styles.container}>
      <GoogleFonts />
      {/* <HrefLang /> */}
      <Header sticky headerStyleConfig={{ backgroundColor: '#000' }} />
      <OverviewNormal
        title={industryText}
        titlePre={`${i18n('layout.Common_MeetSolvea')}:`}
        backgroundUrl={solutionsImageMap[slug]}
        goUrl={getLink('/contact')}
        goText={i18n('layout.Common_GetStarted')}
      />
      <BrandCarousel />
      <PointsIntro
        title={i18n('layout.Solutions_PainPoints')}
        data={data?.painPoints}
      />
      <PointsIntro
        title={i18n('layout.Solutions_Solutions')}
        showCheck
        aos="fade-left"
        data={data?.solutions}
      />
      <LivechatDemo livechatData={livechatData} painPoints={data?.painPoints} />
      {/* <Flowchart /> */}
      <CardIntro
        title={i18n('layout.Solutions_WhyChooseUs')}
        subTitle={i18n('layout.Solutions_WhyChooseUs_Desc')}
        goBtnText={i18n('layout.Common_GetStarted')}
        goBtnUrl={getLink('/contact')}
        data={[
          {
            title: i18n('layout.Solutions_WhyChooseUs_Reason_Title_1'),
            desc: i18n('layout.Solutions_WhyChooseUs_Reason_Desc_1'),
          },
          {
            title: i18n('layout.Solutions_WhyChooseUs_Reason_Title_2'),
            desc: i18n('layout.Solutions_WhyChooseUs_Reason_Desc_2'),
          },
          {
            title: i18n('layout.Solutions_WhyChooseUs_Reason_Title_3'),
            desc: i18n('layout.Solutions_WhyChooseUs_Reason_Desc_3'),
          },
          {
            title: i18n('layout.Solutions_WhyChooseUs_Reason_Title_4'),
            desc: i18n('layout.Solutions_WhyChooseUs_Reason_Desc_4'),
          },
        ]}
      />
      <BrandWall
        title={i18n('layout.Solutions_Customer_Wall_Title')}
        data={brandImageList}
      />
      <Footer />
    </div>
  );
}
