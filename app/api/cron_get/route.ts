/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 获取请求头中的 Authorization
    // const authHeader = req.headers.get('Authorization');

    // 检查 Authorization 是否存在并验证 token
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json({ error: 'Authorization header is missing or malformed' }, { status: 401 });
    // }

    // const token = authHeader.split(' ')[1];
    const cronKey = process.env.CRON_AUTH_KEY;

    // 验证 token
    // if (cronKey !== token) {
    //   return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    // }

    // 发起POST请求到目标URL并添加自定义Headers
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cron`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cronKey}`, // 使用相同的token，也可以换成其他需要的header
      },
      body: JSON.stringify({
        key: 'value',
      }),
    });

    // 检查目标请求是否成功
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from target URL' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
