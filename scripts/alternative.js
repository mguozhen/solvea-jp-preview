const path = require('path');
const fs = require('fs');

// 命令行 yarn gen-alts 执行
// 用于构建一个json文件，存储每个页面对应的hreflang link标签对应内容

const basePath = process.cwd();
const rootPath = path.join(basePath, './src/app');

const excludeDirs = ['api', 'mod', 'cn', 'jp', 'pt', 'es', 'de', 'fr'];
// const langs = ['de', 'es', 'pt', 'fr', 'jp', 'cn'];
const langs = [];

const langMap = {
  en: 'en-US',
  jp: 'ja-jP',
  de: 'de-DE',
  es: 'es-ES',
  pt: 'pt-PT',
  fr: 'fr-FR',
};

let list = [
  {
    'en-US': 'https://solvea.cx',
    'ja-JP': 'https://solvea.cx/jp',
    'fr-FR': 'https://solvea.cx/fr',
    'pt-PT': 'https://solvea.cx/pt',
    'es-ES': 'https://solvea.cx/es',
    'de-DE': 'https://solvea.cx/de',
  },
];
const baseUrl = 'https://solvea.cx';

/**
 * 递归读取目录进行处理
 * @param {*} dirPath 当前要读取的目录地址
 * @param {*} key 用于携带上一级目录名，处理多层目录的情况
 */
function readPath(dirPath, key, lang = 'en', excludeDirs = []) {
  const dirs = fs.readdirSync(dirPath).filter((v) => !excludeDirs.includes(v));

  dirs.forEach((v) => {
    const filePath = path.join(dirPath, v);
    const stats = fs.statSync(filePath);

    // 当前项为目录，则进行处理，忽略文件
    if (stats.isDirectory()) {
      let item = {};
      const enPath = baseUrl + key + v;
      for (const langKey in langMap) {
        if (lang === langKey) {
          // 当前语言对应的目录
          item[langMap[langKey]] = langKey === 'en' ? enPath : `${baseUrl}/${langKey}${key}${v}`;
        } else {
          const subDirPath = path.join(rootPath, langKey, key, v);
          if (
            fs.existsSync(subDirPath) &&
            fs.statSync(subDirPath).isDirectory() &&
            fs.existsSync(path.join(subDirPath, 'index.tsx'))
          ) {
            item[langMap[langKey]] = langKey === 'en' ? enPath : `${baseUrl}/${langKey}${key}${v}`;
          }
        }
      }

      list.push(item);
      // 递归读取，拼接目录名作为key传递
      readPath(filePath, key + v + '/', lang, excludeDirs);
    }
  });
}

// 英文和其他国语言路径做区分
langs.forEach((item) => readPath(rootPath + `/${item}`, '/', item, excludeDirs));

readPath(rootPath, '/', 'en', excludeDirs);

const jsonFilePath = path.join(process.cwd(), './src/constant/altPage.json'); // json存储路径
// 对list进行处理，多语言路径分别对应一个对象
const map = list.reduce((pre, cur) => {
  const langs = Object.keys(cur);
  langs.forEach((lang) => {
    const path = cur[lang].replace(baseUrl, '');
    pre[path] = cur;
  });
  return pre;
}, {});
fs.writeFileSync(jsonFilePath, JSON.stringify(map, null, 2));
