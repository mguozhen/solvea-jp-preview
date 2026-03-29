# solvea-cx — Solvea 官网前端

[https://solvea.cx](https://solvea.cx) 的官网源码，基于 **Next.js 14 App Router + TypeScript + React 18**。

---

## 技术栈

| 层        | 技术                                      |
|-----------|-------------------------------------------|
| 框架      | Next.js 14 (App Router)                   |
| 语言      | TypeScript 4.9                            |
| UI        | Ant Design 5、MUI 5、SCSS Modules         |
| 动画      | Lottie Web、AOS                           |
| 语音/AI   | Vapi AI (`@vapi-ai/web`)、Twilio Voice    |
| 状态管理  | Recoil                                    |
| 国际化    | Localazy (`localazy.json`)                |
| CI/CD     | GitLab CI（staging / prod 两套流水线）    |
| 容器化    | Docker                                    |

---

## 目录结构

```
solvea-cx/
├── public/                   # 静态资源
│   ├── svg/                  # 所有 SVG 图标（通过 SVGR 自动生成 React 组件）
│   └── *.json                # Lottie 动画文件
│
├── scripts/
│   ├── alternative.js        # 构建前生成 hreflang 替代页（多语言 SEO）
│   ├── genAntdCss.tsx        # 构建前提取 antd 静态 CSS（加速首屏）
│   └── cdn/                  # CDN 上传脚本（AWS / 阿里云 OSS）
│
├── src/
│   ├── app/                  # Next.js App Router 页面与路由
│   │   ├── page.tsx                        # 首页 /
│   │   ├── layout.tsx                      # 全局 Layout（字体、多语言、追踪）
│   │   ├── HomeContent.tsx                 # 首页聚合组件
│   │   ├── Responsive.tsx                  # 响应式断点封装
│   │   ├── langSet.tsx                     # 语言环境初始化
│   │   ├── global.css                      # 全局样式
│   │   │
│   │   ├── [... slug]/                     # 落地页渲染系统（见下文"落地页系统"章节）
│   │   ├── agent/                          # /agent — AI 客服对话界面
│   │   │   └── mod/
│   │   │       ├── Chat/                   # 对话消息流
│   │   │       ├── Voice/                  # 语音通话（Vapi / Twilio）
│   │   │       ├── MessageItem/            # 单条消息气泡
│   │   │       ├── MessageList/            # 消息列表
│   │   │       ├── Markdown/               # Markdown 渲染
│   │   │       ├── Modal/                  # 弹窗
│   │   │       ├── Loading/ fullLoading/   # 加载态
│   │   │       └── VoiceLoading/           # 语音加载动画
│   │   │
│   │   ├── contact/                        # /contact — 联系我们页
│   │   ├── register/                       # /register — 注册页
│   │   ├── affiliates/welcome/             # /affiliates/welcome — 渠道合作欢迎页
│   │   ├── privacy-policy/                 # /privacy-policy
│   │   ├── terms-and-condition/            # /terms-and-condition
│   │   ├── page-preview/                   # /page-preview — CMS 页面预览
│   │   │
│   │   ├── customer-stories/               # /customer-stories — 客户案例
│   │   │   ├── page.tsx                    # 案例列表页
│   │   │   ├── [slug]/page.tsx             # 单篇案例详情
│   │   │   └── mod/                        # 列表/详情页内部模块
│   │   │
│   │   ├── glossary/                       # /glossary — AI 客服术语库（SEO，见下文）
│   │   │   ├── page.tsx                    # 词条列表页
│   │   │   ├── [...slug]/page.tsx          # 单篇词条详情
│   │   │   └── mod/                        # 列表/详情页内部模块
│   │   │
│   │   ├── solutions/[slug]/               # /solutions/:slug — 行业解决方案页
│   │   │
│   │   ├── mod/                            # 首页各区块组件（只用于 app 层）
│   │   │   ├── Header/                     # 顶部导航
│   │   │   ├── Footer/                     # 页脚
│   │   │   ├── AllInOne/                   # "All-in-one" 功能展示区
│   │   │   ├── BrandIntegration/           # 品牌/集成合作 Logo 墙
│   │   │   ├── CommunitySay/               # 用户评价 / 社区声音
│   │   │   ├── ConsumerBlock/              # 消费者数据块
│   │   │   ├── GetStart/                   # 注册入口区（含中国区表单 CNForm）
│   │   │   ├── HowItWork/                  # 产品工作原理
│   │   │   ├── LandingPageRender/          # CMS 落地页渲染引擎
│   │   │   ├── Performance/                # 性能数据展示
│   │   │   ├── Redefines/                  # "重新定义 AI 客服" 英雄区
│   │   │   ├── Resolution/                 # 问题解决率数据区
│   │   │   ├── Scene/                      # 场景示例区
│   │   │   ├── ScrollingBrandWall/         # 滚动品牌 Logo 带
│   │   │   ├── SecurityAutomation/         # 安全与自动化功能区
│   │   │   ├── Skeptics/                   # 消除顾虑 / FAQ 区
│   │   │   ├── Slower/                     # 对比竞品慢速动画区
│   │   │   ├── Solutions/                  # 行业解决方案入口
│   │   │   ├── SolveaLottie/               # Lottie 动画封装
│   │   │   ├── SolveaSkill/                # Solvea 能力展示
│   │   │   ├── SolveaSmallBrands/          # 小品牌客户 Logo
│   │   │   ├── SupportPlatform/            # 支持平台展示
│   │   │   ├── ThinkWork/                  # "Think & Work" 流程图区
│   │   │   ├── Button/                     # 页面级按钮组件
│   │   │   ├── Line/ NumberTicker/         # 装饰线 / 数字滚动
│   │   │   └── svgs/                       # 页面内联 SVG（icons / logos）
│   │   │
│   │   └── api/
│   │       └── profound-log/route.ts       # 服务端日志上报 API
│   │
│   ├── i18n/                               # 多语言文案（见下文"国际化"章节）
│   │   ├── en/  jp/  de/  es/             # 已激活的 URL 前缀语言
│   │   └── cn/  fr/  pt/                  # 其余语言（slug 内含前缀，无 URL rewrite）
│   │
│   ├── middleware.ts                       # Edge Middleware（i18n rewrite、301 重定向）
│   │
│   ├── components/                         # 全局可复用组件
│   │   ├── Header/                         # 站点顶部导航（含多语言、登录态、追踪）
│   │   │   └── mod/
│   │   │       ├── navigation/             # 导航数据（en / cn / jp 三语）
│   │   │       └── tracking/               # GA / Hotjar / Baidu / Profound 追踪脚本
│   │   ├── Footer/                         # 站点页脚
│   │   ├── BookDemo/                       # "Book a Demo" 按钮 + 弹窗
│   │   ├── ContactUsFloat/                 # 右下角悬浮联系按钮
│   │   ├── DefaultBtn/                     # 通用 CTA 按钮（含 bookDemo 变体）
│   │   ├── EnForm/                         # 英文区注册表单
│   │   ├── BrandCarousel / BrandWall / BrandScreen / Brands/  # 品牌 Logo 各形态
│   │   ├── BreadCrumb/                     # 面包屑导航
│   │   ├── CardIntro/                      # 功能介绍卡片
│   │   ├── Flowchart/                      # 流程图组件
│   │   ├── GuideCard/                      # 引导卡片
│   │   ├── HeaderLangSwap/                 # 语言切换按钮
│   │   ├── HoverText/                      # Hover 文字动效
│   │   ├── GoButton/                       # 跳转按钮
│   │   ├── GoogleFonts/                    # Google Fonts 异步加载
│   │   ├── GoogleIdentityServicesHost/     # Google 一键登录宿主组件
│   │   ├── AOSWrapper/                     # AOS 滚动动画初始化
│   │   ├── BatchAnimation/                 # 批量入场动画
│   │   └── Icons/                          # SVG 图标 React 组件（由 SVGR 自动生成）
│   │
│   └── hooks/
│       ├── useBatchAnimation.ts            # 批量动画 hook
│       ├── useInViewAnimation.ts           # 元素入视口动画 hook
│       ├── useRemAdapter.ts                # rem 适配 hook
│       └── useCnTallyListener.ts           # 中国区 Tally 表单事件监听
│
├── Dockerfile                              # 生产镜像
├── .gitlab-ci.yml                          # GitLab CI 入口
├── .gitlab-ci.staging.yml                  # Staging 流水线
├── .gitlab-ci.prod.yml                     # Production 流水线
├── next.config.js                          # Next.js 配置
├── localazy.json                           # 国际化翻译配置
└── package.json
```

---

## 开发命令

```bash
# 安装依赖
yarn

# 本地开发（端口 3002）
yarn dev

# 构建生产包
yarn build

# 启动生产服务（端口 3000）
yarn start

# Lint
yarn lint

# 分析 bundle 大小
yarn analyze

# 从 public/svg/ 批量生成 Icons 组件
yarn svgr
```

> `dev` / `build` 均有 pre-hook，会自动执行 `genAntdCss`（提取 antd 静态样式）和 `gen-alts`（生成多语言 hreflang 替代页）。

---

## 路由一览

| 路由 | 说明 |
|------|------|
| `/` | 实际由 Nginx 转发至 `/agent-for-smb`（见下文） |
| `/agent-for-smb` | 当前真正的首页（CMS 落地页） |
| `/agent` | AI 客服对话 Demo |
| `/contact` | 联系我们 |
| `/register` | 注册 |
| `/solutions/[slug]` | 行业解决方案（ecommerce / hotel / medspa / law…） |
| `/customer-stories` | 客户案例列表 |
| `/customer-stories/[slug]` | 单篇客户案例 |
| `/glossary` | AI 客服术语库列表（SEO） |
| `/glossary/[...slug]` | 单篇术语词条（SEO） |
| `/affiliates/welcome` | 渠道合作欢迎页 |
| `/privacy-policy` | 隐私政策 |
| `/terms-and-condition` | 服务条款 |
| `/[...slug]` | CMS 动态落地页渲染系统（任意路径） |
| `/jp/*` `/es/*` `/de/*` | 多语言版（Middleware rewrite，见下文） |
| `/compare-sitemap.xml` | 竞品对比页 Sitemap |
| `/customer-stories-sitemap.xml` | 案例 Sitemap |
| `/glossary-sitemap.xml` | 术语 Sitemap |
| `/llms.txt` | LLM 爬虫友好文本 |
| `/api/profound-log` | 服务端日志上报接口 |

---

## 首页

代码里的 `app/page.tsx` 并不是真正对外的首页。**Nginx 层**将 `solvea.cx/` 统一 proxy_pass / rewrite 到 `/agent-for-smb`，后者是一个 CMS 落地页（`post_type: solveaCxLanding`），由 `[...slug]` 渲染系统处理。

多语言首页同理，走各自的语言前缀路径：

| 语言 | 首页路径 |
|------|---------|
| English | `/agent-for-smb`（Nginx 从 `/` 转发） |
| 日本語 | `/jp/agent-for-smb` |
| Español | `/es/agent-for-smb` |
| Deutsch | `/de/agent-for-smb` |

---

## 落地页系统（`[...slug]`）

这是一套**无代码页面编排 + 渲染**系统，分为两部分：

- **编排系统（内部 Node.js 管理后台）**：运营/产品在后台拖拽、配置组件树，保存时将整个页面结构序列化为 JSON 存入数据库（`post_content` 字段）。
- **渲染系统（`src/app/[...slug]/page.tsx` + `src/app/mod/LandingPageRender/`）**：Next.js 服务端从 CMS API（`/n/blog/getLandingBySlug`）拉取 JSON，按 K-V 映射 + JsonSchema 约定将组件树渲染为真实 React 组件树，走 SSR 输出。

**数据结构约定：**

```
post_type     = "solveaCxLanding"   // 必须为此类型才渲染为落地页
post_status   = "public"            // 必须公开
post_content  = "<JSON string>"     // 组件树 JSON，顶层字段包括：
  seoTitle / seoDescription / seoKeywords / canonical
  headerFooterStyle / backgroundColor / theme
  subComponents[]   // 组件节点数组，每个节点 { type, props, subComponents }
```

每个组件节点的 `type` 对应 `LandingPageRender` 内部的组件映射表，`props` 按该组件的 JsonSchema 传入。

**特殊处理：**
- 若页面含 `SolveaSubscribe` 定价组件，服务端会预取套餐信息（`listAllPlgOfficialPlan`，revalidate 1 小时）并注入 props，确保 SEO 初始 HTML 带真实价格。
- URL 中若带 query 参数（如 `?group=test`），会携带 query 优先查 CMS，找不到再用纯 path 回退，避免 UTM 参数导致 404。

---

## SEO 博客 / Glossary

`/glossary`（术语库）和博客类页面均以 SEO 为核心目标。文章内容**不在此仓库中维护**，由内部独立的 Node.js 管理应用管理，数据库结构基于 WordPress 并加以扩展（同一套 `post_type / post_status / post_content` 字段体系）。

前端只负责从该系统的 API 拉取内容并渲染，不直接操作数据库。

---

## 国际化

### URL 路由层（Middleware）

`src/middleware.ts` 实现了 **i18n URL rewrite**，目前激活的语言前缀为 `jp`、`es`、`de`：

```
/jp/xxx  →  内部 rewrite 为 /xxx，并将语言写入请求头 voc-lang=ja-JP
/es/xxx  →  内部 rewrite 为 /xxx，voc-lang=es-ES
/de/xxx  →  内部 rewrite 为 /xxx，voc-lang=de-DE
```

Next.js 路由感知不到这层前缀，页面代码通过读取 `voc-lang` 请求头来获知当前语言。

中文（`cn`）、法语（`fr`）、葡语（`pt`）没有 URL rewrite，其多语言落地页的语言前缀直接体现在 CMS slug 里（如 `/cn/agent-for-smb`），由 `[...slug]` 系统处理。

Middleware 同时负责：
- `glossary` 多语言路径（`jp/fr/de/es`）301 重定向回英文版
- `customer-stories` 部分语言路径 301 重定向回英文版（`jp/fr/es`，`de` 保留）
- 旧版 customer-stories slug 301 重定向（如 `/customer-stories/anker` → `/customer-stories/anker-case`）
- Staging 环境自动加 `X-Robots-Tag: noindex, nofollow`

### 文案层（`src/i18n/`）

静态文案（Header、Footer、通用 UI 文本等）按语言存放在 `src/i18n/<lang>/` 下，每个语言包含：

| 文件 | 内容 |
|------|------|
| `solvea.ts` | 主站文案 |
| `layout.ts` | 布局通用文案 |
| `price.ts` | 定价相关文案 |
| `docs.ts` | 文档/术语相关文案 |
| `index.ts` | 聚合导出 |

**翻译流程**：先用英文（`en/`）写好所有 JSON，再用 AI 批量将 value 翻译成目标语言后保存为对应 `<lang>/` 文件。导航菜单数据同理，位于 `src/components/Header/mod/navigation/`（`en.tsx` / `cn.tsx` / `jp.tsx`）。

---

## 追踪 & 分析

追踪脚本注入点在 `src/components/Header/mod/tracking/`：

| 文件 | 平台 |
|------|------|
| `ga.tsx` | Google Analytics |
| `hotjar.tsx` | Hotjar |
| `baidu.tsx` | 百度统计 |
| `profound.tsx` | Profound（自研事件埋点） |
| `arms.tsx` | 阿里云 ARMS |

---

## CI/CD

部署流水线跑在**内网 GitLab**（安全隔离 + 访问内网资源方便）。GitLab CI 分三个文件：

- `.gitlab-ci.yml` — 总入口，根据分支 include 对应子配置
- `.gitlab-ci.staging.yml` — Staging 环境自动部署
- `.gitlab-ci.prod.yml` — Production 环境手动触发部署

### GitHub ↔ GitLab 同步

当前方式是**手动**将代码在两个 remote 之间来回同步，容易遗漏、容易出错。

推荐改成 **GitHub Actions 自动推送到 GitLab**，在 main 分支有 push 时触发，单向同步，零维护：

```yaml
# .github/workflows/sync-to-gitlab.yml
name: Sync to GitLab

on:
  push:
    branches: [main]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0          # 完整历史，避免 force-push

      - name: Push to internal GitLab
        run: |
          git remote add gitlab ${{ secrets.GITLAB_REPO_URL }}
          git push gitlab HEAD:main --force-with-lease
        env:
          GIT_ASKPASS: echo
          GIT_USERNAME: gitlab-ci-bot
          GIT_PASSWORD: ${{ secrets.GITLAB_ACCESS_TOKEN }}
```

只需在 GitHub repo Settings → Secrets 里加两个变量：

| Secret | 值 |
|--------|----|
| `GITLAB_REPO_URL` | `https://<user>@gitlab.internal/org/solvea-cx.git` |
| `GITLAB_ACCESS_TOKEN` | GitLab Project Access Token（`write_repository` 权限） |

这样开发流程变成：**本地 → push GitHub → Actions 自动同步 GitLab → GitLab CI 自动部署**，不再需要人工操作。
