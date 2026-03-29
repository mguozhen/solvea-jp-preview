/**
 * 只提取项目实际使用的 antd 组件样式，减少 unused CSS（约 83 KiB → 仅用到的组件）
 * 与 next.config.js 中 lessLoaderOptions.modifyVars 主题保持一致
 */
import { extractStyle } from '@ant-design/static-style-extract';
import {
  Button,
  Carousel,
  Col,
  Collapse,
  ConfigProvider,
  Descriptions,
  Divider,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Popover,
  Row,
  Select,
  Slider,
  Space,
  Spin,
  Table,
  Tabs,
} from 'antd';
import React from 'react';
import fs from 'fs';
import path from 'path';

const outputPath = './public/antd.min.css';
const versionPath = './public/antd.version';

// Skip regeneration if antd version hasn't changed
const antdVersion: string = require(path.resolve('./node_modules/antd/package.json')).version;
if (
  fs.existsSync(versionPath) &&
  fs.readFileSync(versionPath, 'utf-8').trim() === antdVersion &&
  fs.existsSync(outputPath)
) {
  console.log(`[genAntdCss] antd@${antdVersion} unchanged, skipping.`);
  process.exit(0);
}

// 与 next.config.js lessLoaderOptions.modifyVars 对齐
const theme = {
  token: {
    colorPrimary: '#4080FF',
    colorLink: '#4080FF',
    colorSuccess: '#69b678',
    colorWarning: '#f29d49',
    colorError: '#ff5252',
  },
};

// 渲染所有在项目中被用到的 antd 组件，extractStyle 只会提取这些组件的样式
function UsedComponents() {
  return (
    <>
      <Button>_</Button>
      <Carousel />
      <Col span={12} />
      <Collapse items={[{ key: '1', label: '_', children: '_' }]} />
      <Descriptions items={[]} />
      <Divider />
      <Form />
      <Input />
      <Menu items={[{ key: '1', label: '_' }]} />
      <Modal open={false}>_</Modal>
      <Pagination total={0} />
      <Popover content="_">_</Popover>
      <Row />
      <Select options={[]} />
      <Slider />
      <Space />
      <Spin />
      <Table dataSource={[]} columns={[]} />
      <Tabs items={[{ key: '1', label: '_', children: '_' }]} />
    </>
  );
}

const css = extractStyle(() => (
  <ConfigProvider theme={theme}>
    <UsedComponents />
  </ConfigProvider>
));

fs.writeFileSync(outputPath, css);
fs.writeFileSync(versionPath, antdVersion);
console.log(`[genAntdCss] Wrote ${outputPath} (antd@${antdVersion}, used components only)`);
