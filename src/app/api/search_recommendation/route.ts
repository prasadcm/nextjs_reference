import { registerDependencies } from '@/lib/di';
import { SearchRecommendationService } from '@/lib/services/searchRecommendationService';
import type { ApiResponse } from '@/types/api';
import { NextResponse } from 'next/server';
import { container } from 'tsyringe';

registerDependencies();

export async function GET(_req: Request): Promise<NextResponse<ApiResponse<unknown>>> {
    const searchService = container.resolve(SearchRecommendationService);

    try {
        const response = await searchService.fetch();
        return NextResponse.json(response);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
