import type { ApiResponse } from '@/types/api';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ApiResponse<unknown>>> {
    return NextResponse.json({ error: 'The specified url does not exists' }, { status: 500 });
}
