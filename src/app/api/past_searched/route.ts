import type { ApiResponse } from '@/types/api';
import { isValidParam } from '@lib/utils/queryParams';
import { NextResponse } from 'next/server';

export async function GET(req: Request): Promise<NextResponse<ApiResponse<unknown>>> {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const phoneNumber = searchParams.get('phone_number');

    const queryParams = new URLSearchParams();
    if (isValidParam(email) === true) queryParams.append('email', email);
    if (isValidParam(phoneNumber) === true) queryParams.append('phone_number', phoneNumber);
    try {
        const res = await fetch(`${process.env.SEARCH_BASE_URL}/search?${queryParams}`, {
            method: 'GET',
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch from FastAPI' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
