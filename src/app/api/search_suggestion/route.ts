import { registerDependencies } from '@/lib/di';
import { SearchSuggestionService } from '@/lib/services/searchSuggestionService';
import type { ApiResponse } from '@/types/api';
import { NextResponse } from 'next/server';
import { container } from 'tsyringe';

registerDependencies();

export async function GET(req: Request): Promise<NextResponse<ApiResponse<unknown>>> {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    const searchService = container.resolve(SearchSuggestionService);

    try {
        const response = await searchService.fetch((query ?? '').trim());
        return NextResponse.json(response);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
