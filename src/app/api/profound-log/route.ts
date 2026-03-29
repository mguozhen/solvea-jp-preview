import { NextRequest, NextResponse } from 'next/server';
import { sendLogsToProfound, ProfoundLogEntry, getLastProfoundError } from '@/util/profound';

/**
 * Profound 日志代理接口
 * 允许客户端通过该接口发送日志到 Profound
 */
export async function POST(request: NextRequest) {
  try {
    const logs: ProfoundLogEntry[] = await request.json();

    if (!Array.isArray(logs)) {
      return NextResponse.json(
        { error: 'Invalid request body, expected array of logs' },
        { status: 400 },
      );
    }

    const success = await sendLogsToProfound(logs);

    const response = success
      ? NextResponse.json({ success: true, count: logs.length })
      : NextResponse.json(
          { 
            error: 'Failed to send logs to Profound',
            details: getLastProfoundError(),
          },
          { status: 500 },
        );

    // 添加 CORS 头支持
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE',
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    return response;
  } catch (error) {
    console.error('[Profound API] Error:', error);
    const errorResponse = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );

    // 添加 CORS 头支持
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE',
    );
    errorResponse.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    return errorResponse;
  }
}

/**
 * 处理 CORS 预检请求
 */
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );
  return response;
}

