import { registerDependencies } from '@/lib/di';
import { SearchService } from '@/lib/services/searchService';
import type { ApiResponse } from '@/types/api';
import { NextResponse } from 'next/server';
import { container } from 'tsyringe';

registerDependencies();

export async function GET(req: Request): Promise<NextResponse<ApiResponse<unknown>>> {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const phoneNumber = searchParams.get('phone_number');

    const searchService = container.resolve(SearchService);

    try {
        const response = await searchService.fetchPreviouslySearched({ email, phoneNumber });
        return NextResponse.json(response);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
