import { SITE } from "@/constant/base";
import { getBlogs, SLX_HOST } from 'util/services';
import { stringify } from 'shulex-util';

export async function getData(lang, site = SITE) {
  try {
    // 获取termid
    const itemMenuRes = await fetch(
      `${SLX_HOST}/wp-admin/n/internal/blog/getMenu?${stringify({
        taxonomyDesc: `customer`,
        taxonomyType: 'customer',
        site,
      })}`,
      {
        credentials: 'include',
      },
    );
    const menuDataItem = (await itemMenuRes.json())?.data as any;
    const term = menuDataItem?.find((v) => v.name === lang);
    const data = await getBlogs({
      // categoryIds: [termId],
      slug: term?.slug,
      taxonomyDescList: 'customer',
      taxonomyType: 'customer',
      site,
    });
    return data?.list;
    // const targetData = usercaceData[lang] ?? usercaceData['en-US'];
    // return targetData;
  } catch (error) {}
}
