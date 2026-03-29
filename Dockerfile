# syntax=docker/dockerfile:1.4
# 两阶段构建：
#   builder  — 安装全量依赖、运行 next build、上传 CDN
#   runner   — 仅包含 standalone 输出（~300MB，无 devDeps 无源码）

# ── Stage 1: builder ──────────────────────────────────────────────────────────
FROM node:22-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl unzip python3 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /root
COPY credentials /root/.aws/credentials

# 依赖安装：yarn 缓存挂载，lock 未变时本层可复用
COPY package.json yarn.lock /root/
RUN --mount=type=cache,target=/root/.yarn/cache \
    yarn --registry http://10.7.4.252:4873

# CLI 工具单独一层，仅 init_cli.sh 变更时重跑（避免每次构建都下载 aws/ossutil）
COPY scripts/cdn/init_cli.sh /root/scripts/cdn/init_cli.sh
RUN bash /root/scripts/cdn/init_cli.sh > /dev/null

# 源码（任一文件变更都会从此层开始重建）
COPY . /root/

ARG app_env_arg=production
ARG runner_tag=staging
ARG profound_api_key=""

ENV appEnv=$app_env_arg
ENV APP_ENV=$app_env_arg
ENV RUNNER_TAG=$runner_tag
ENV PROFOUND_API_KEY=$profound_api_key
ENV IS_PRODUCTION=true
ENV HOST=solvea.cx
ENV JS_ENV=production
ENV NODE_ENV=production

# Next 构建缓存挂载 + 增大 Node 内存，避免 OOM 并加速构建
RUN --mount=type=cache,target=/root/.next/cache \
    NODE_OPTIONS=--max_old_space_size=4096 \
    yarn gen-alts && \
    yarn build

# 上传静态资源到 CDN（并行）
RUN sh ./scripts/cdn/awsupload.sh & sh ./scripts/cdn/ossupload.sh && wait

# ── Stage 2: runner ───────────────────────────────────────────────────────────
# 仅包含 standalone 输出：server.js + 打包后的 node_modules + public + static
# 无源码、无 devDeps、无 CLI 工具，镜像体积 ~300MB（对比单阶段的 ~1.2GB）
FROM node:22-slim AS runner

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /root

ARG app_env_arg=production
ARG runner_tag=staging

ENV NODE_ENV=production
ENV PORT=3000
# 必须为 0.0.0.0，否则 Docker 容器内监听 localhost 无法被外部访问
ENV HOSTNAME=0.0.0.0
ENV APP_ENV=$app_env_arg
ENV RUNNER_TAG=$runner_tag
ENV HOST=solvea.cx

# standalone 目录已内置所有运行时依赖（next build 自动 tree-shake 并 bundle）
COPY --from=builder /root/.next/standalone ./
# 静态资源需放在 server.js 同级的 .next/static 下
COPY --from=builder /root/.next/static .next/static
# public 目录需放在 server.js 同级
COPY --from=builder /root/public ./public
# llms.txt 由 Route Handler 读取；standalone 不含源码，单独拷贝
COPY --from=builder /root/src/content/llms.txt ./content/llms.txt

RUN mkdir -p ./logs

ENTRYPOINT ["node", "server.js"]
