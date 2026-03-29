/* eslint-disable no-unused-vars */
interface indicatorItem {
  value: string;
  desc: string; //'问题解决率',
}

interface UserCaseContentItem {
  title: string;
  content: string;
}

interface UserCaseItem {
  brandImage: string;
  productImage: string;
  key: string;
  title: string;
  desc: string;
  moreUrl: string;
  indicator: indicatorItem[];
  contentList: UserCaseContentItem[];
}
