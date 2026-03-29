/**
 * Profound 自定义日志分析集成
 * 文档: https://docs.tryprofound.com/agent-analytics/custom
 *
 * ⚠️ 重要: API Key 必须从环境变量读取，不能硬编码在代码中!
 * 环境说明：基于 RUNNER_TAG 变量自动确定环境
 *   - RUNNER_TAG = "prod" → production 环境
 *   - 其他值 → staging/development 环境
 */

// ✅ 从环境变量读取 API Key（更安全）
const PROFOUND_API_KEY = process.env.PROFOUND_API_KEY || '';
const PROFOUND_ENDPOINT = 'https://artemis.api.tryprofound.com/v1/logs/custom';

/**
 * 根据 RUNNER_TAG 判断是否为生产环境
 * @returns boolean - 是否为生产环境
 */
function isProductionEnv(): boolean {
  const runnerTag = process.env.RUNNER_TAG || process.env.APP_ENV || '';
  return runnerTag === 'prod' || runnerTag === 'production';
}

// 全局错误记录（用于生产环境调试）
let lastProfoundError: any = null;

/**
 * 获取最后一个错误
 */
export function getLastProfoundError() {
  return lastProfoundError;
}

export interface ProfoundLogEntry {
  // 必需字段
  timestamp: string | number; // Unix 时间戳或 ISO 8601 字符串
  method: string; // HTTP 方法（最多 10 个字符）
  host: string; // 请求主机名（最多 255 个字符）
  path: string; // 请求路径（最多 2048 个字符）
  status_code: number; // HTTP 状态码（范围：100-599）
  ip: string; // 客户端 IP 地址（最多 45 个字符）
  user_agent: string; // 用户代理字符串（最多 1024 个字符）

  // 可选字段
  query_params?: Record<string, string>; // 查询参数
  referer?: string; // 请求引用者（最多 2048 个字符）
  bytes_sent?: number; // 响应大小（字节，必须 ≥ 0）
  duration_ms?: number; // 请求持续时间（毫秒，必须 ≥ 0）
}

/**
 * 发送日志到 Profound
 * @param logs 日志数组（最多 1000 条）
 * @returns Promise<boolean> 是否成功
 */
export async function sendLogsToProfound(
  logs: ProfoundLogEntry[],
): Promise<boolean> {
  const isProd = isProductionEnv();

  // ⚠️ 验证 API Key 已配置
  if (!PROFOUND_API_KEY) {
    if (isProd) {
      // 生产环境必须有 API Key
      console.error(
        '[Profound] ❌ 严重错误: PROFOUND_API_KEY 环境变量未设置！',
      );
      console.error(
        '[Profound] 请在 GitLab CI/CD 变量中配置 PROFOUND_API_KEY。',
      );
    } else {
      // 开发/测试环境仅警告
      console.warn('[Profound] 测试环境: PROFOUND_API_KEY 未设置（正常）');
    }
    return false;
  }

  console.log('[Profound] 环境信息:', {
    RUNNER_TAG: process.env.RUNNER_TAG,
    isProd,
    logsCount: logs.length,
    apiKeyConfigured: !!PROFOUND_API_KEY,
  });

  // 验证日志数量
  if (logs.length === 0) {
    console.warn('[Profound] 日志数组为空');
    return false;
  }

  if (logs.length > 1000) {
    console.error('[Profound] 日志数量超过 1000 条限制');
    return false;
  }

  // 🔧 非生产环境处理：仅输出日志，不实际发送
  if (!isProd) {
    console.log(
      '%c[Profound] 测试环境模式 (RUNNER_TAG != prod)',
      'color: #FFA500; font-weight: bold;',
    );
    console.log('%c准备发送的日志数据:', 'color: #FFA500;', logs);
    console.log(
      '%c💡 提示: 测试环境不会真正发送到 Profound API',
      'color: #0066CC;',
    );
    console.log(
      '%c📝 日志详情:',
      'color: #0066CC;',
      JSON.stringify(logs, null, 2),
    );
    console.log(
      '%c✅ 在生产环境（RUNNER_TAG=prod）会真正发送',
      'color: #00AA00;',
    );
    return true; // 返回 true 表示"成功"（虽然没有真正发送）
  }

  // ✅ 生产环境：真正发送到 Profound API
  try {
    console.log(
      '%c[Profound] 生产环境模式，正在发送到: ' + PROFOUND_ENDPOINT,
      'color: #00AA00; font-weight: bold;',
    );

    const response = await fetch(PROFOUND_ENDPOINT, {
      method: 'POST',
      headers: {
        'x-api-key': PROFOUND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logs),
    });

    console.log(
      '[Profound] API 响应状态:',
      response.status,
      response.ok ? '✅' : '❌',
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorInfo = {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        apiKey: PROFOUND_API_KEY ? '已配置' : '未配置',
        endpoint: PROFOUND_ENDPOINT,
      };
      lastProfoundError = errorInfo;
      console.error('[Profound] 日志发送失败:', errorInfo);
      return false;
    }

    const result = await response.json();
    console.log('[Profound] ✅ 日志发送成功:', result);
    return true;
  } catch (error) {
    const errorInfo = {
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      apiKey: PROFOUND_API_KEY ? '已配置' : '未配置',
      endpoint: PROFOUND_ENDPOINT,
    };
    lastProfoundError = errorInfo;
    console.error('[Profound] ❌ 发送日志时出错:', errorInfo);
    return false;
  }
}

/**
 * 创建单条日志
 * @param request NextRequest 对象或请求信息
 * @param statusCode HTTP 状态码
 * @param options 可选参数
 */
export function createLogEntry(params: {
  method: string;
  host: string;
  path: string;
  statusCode: number;
  ip?: string;
  userAgent?: string;
  referer?: string;
  queryParams?: Record<string, string>;
  durationMs?: number;
  bytesSent?: number;
}): ProfoundLogEntry {
  return {
    timestamp: new Date().toISOString(),
    method: params.method.substring(0, 10),
    host: params.host.substring(0, 255),
    path: params.path.substring(0, 2048),
    status_code: params.statusCode,
    ip: (params.ip || '0.0.0.0').substring(0, 45),
    user_agent: (params.userAgent || 'Unknown').substring(0, 1024),
    ...(params.queryParams && { query_params: params.queryParams }),
    ...(params.referer && { referer: params.referer.substring(0, 2048) }),
    ...(params.durationMs !== undefined && { duration_ms: params.durationMs }),
    ...(params.bytesSent !== undefined && { bytes_sent: params.bytesSent }),
  };
}

/**
 * 批量日志缓冲器
 * 用于收集日志并批量发送
 */
class LogBuffer {
  private buffer: ProfoundLogEntry[] = [];
  private maxSize: number = 100; // 批量发送的阈值
  private flushInterval: number = 10000; // 10秒自动刷新
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    // 启动定时刷新
    this.startFlushTimer();
  }

  /**
   * 添加日志到缓冲区
   */
  add(log: ProfoundLogEntry) {
    this.buffer.push(log);

    // 如果达到批量大小，立即发送
    if (this.buffer.length >= this.maxSize) {
      this.flush();
    }
  }

  /**
   * 刷新缓冲区，发送所有日志
   */
  async flush() {
    if (this.buffer.length === 0) return;

    const logsToSend = [...this.buffer];
    this.buffer = [];

    await sendLogsToProfound(logsToSend);
  }

  /**
   * 启动定时刷新
   */
  private startFlushTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  /**
   * 停止定时器（通常在应用关闭时调用）
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.flush(); // 最后刷新一次
  }
}

// 全局日志缓冲器实例
export const logBuffer = new LogBuffer();
