import staticData from './static';
import categoryInsights from './categoryInsights';
import common from './common';
import homepage from './homepage';
import voc from './voc';
import copilot from './copilot';
import wordcloud from './wordcloud';
import chatpdf from './chatpdf';
import fbaCalculator from './fbaCalculator';
import aiListing from './aiListing';
import chatbot from './chatbot';
import tools from './tools';
import pay from './pay';
import product from './product';
import aiTranslator from './aiTranslator';
import footer from './footer';
import contactSales from './contactSales';

/*
尽量 每个类型/页面 一个 文件
ES6: export default / import
CommonJS: module.exports / require
*/

export default {
  static: staticData,
  categoryInsights,
  common,
  voc,
  homepage,
  copilot,
  wordcloud,
  chatpdf,
  fbaCalculator,
  aiListing,
  chatbot,
  tools,
  pay,
  product,
  aiTranslator,
  footer,
  contactSales,
};
