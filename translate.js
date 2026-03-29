const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 飞书国际化方案

// 配置
const localeTarget = 'src/i18n/';
const fileArray = {
  layout: 'RIEObYXQEa2FqfsS3nScaDm4nhD|tbl8vhFHWXhAVBow',
  solvea: 'WaLDbLGgiaEd78s3tPnc3PzAnX8|tblrk0ljxlzGorY7',
  price: 'RIEObYXQEa2FqfsS3nScaDm4nhD|tblMlOIrf9mJZxw5',
};
const langArray = {
  en: 'EN',
  cn: 'CN',
  jp: 'JP',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  pt: 'PO',
};

// 创建目标目录
function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
async function getTenantAccessToken() {
  const url = 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal';
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    app_id: 'cli_a7f8ab636a78500d',
    app_secret: 'hvbOaAlIv9cLKfr6LS0Ep5tArbREW7qt',
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log('iiii', response);
    return response.data.tenant_access_token;
  } catch (error) {
    console.error('请求失败:', error.message);
    return null;
  }
}

const fetchAllRecords = async (url, headers) => {
  const records = [];

  const fetchPage = async (nextUrl) => {
    const response = await axios.get(nextUrl, { headers });
    const data = response.data.data;
    records.push(...data.items); // 添加当前页的记录

    if (data.has_more) {
      // 如果有下一页，继续请求
      const nextPageUrl = `${url}&page_token=${data.page_token}`;
      await fetchPage(nextPageUrl);
    }
  };

  await fetchPage(url);

  return records;
};

// 导入文本
async function importText() {
  const tenant_access_token = await getTenantAccessToken();
  for (const [key, value] of Object.entries(fileArray)) {
    const [docId, viewId] = value.split('|');
    const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${docId}/tables/${viewId}/records?page_size=100`;
    const headers = {
      Authorization: `Bearer ${tenant_access_token}`,
    };
    try {
      // const response = await axios.get(url, { headers });
      const records = await fetchAllRecords(url, headers);

      for (const [langFlag, langKey] of Object.entries(langArray)) {
        const fileDir = path.join(localeTarget, langFlag);
        const fileName = path.join(fileDir, `${key}.ts`);
        const baseFilename = path.join(fileDir, 'index.ts');
        createDirectory(fileDir);

        const translations = records.reduce((acc, record) => {
          acc[record.fields.Key] = record.fields[langKey];
          return acc;
        }, {});

        fs.writeFileSync(fileName, `export default ${JSON.stringify(translations, null, 2)};`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
    }
  }
}

// 汇总 index.ts 文件
function summaryIndexTs() {
  createDirectory(localeTarget);

  const targetSubfolders = fs.readdirSync(localeTarget);
  targetSubfolders.forEach((dir) => {
    if (dir === 'index.ts') {
      return;
    }
    const langFolder = path.join(localeTarget, dir);
    const langIndexTs = path.join(langFolder, 'index.ts');
    console.log(langFolder);
    const fileNames = fs.readdirSync(langFolder);

    fs.writeFileSync(langIndexTs, '');
    fileNames.forEach((filename) => {
      const name = path.basename(filename, '.ts');
      if (name === 'index') return;
      fs.appendFileSync(langIndexTs, `import ${name} from './${name}';\n`);
    });

    fs.appendFileSync(langIndexTs, '\nexport default {\n');
    fileNames.forEach((filename) => {
      const name = path.basename(filename, '.ts');
      if (name === 'index') return;
      fs.appendFileSync(langIndexTs, `  ${name},\n`);
    });
    fs.appendFileSync(langIndexTs, '};\n');
  });
}

// 执行函数
importText()
  .then(() => {
    summaryIndexTs();
    console.log('Success');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
