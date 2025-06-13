import type { ApiResponse } from '@/types/api';
import {
    RawSearchRecommendationResponse,
    SearchRecommendation,
    SearchRecommendationResponse,
} from '@/types/searchRecommendationType';

import { injectable } from 'tsyringe';

@injectable()
export class SearchRecommendationService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.SEARCH_BASE_URL!;
    }

    async fetch(): Promise<ApiResponse<unknown>> {
        const res = await fetch(`${this.baseUrl}/search_recommendation`, { method: 'GET' });

        if (!res.ok) {
            throw new Error(`Search returned ${res.status}`);
        }

        const rawData = await res.json();
        const data = this.transform(rawData);
        return { data };
    }

    transform(raw: RawSearchRecommendationResponse): SearchRecommendationResponse {
        return raw.results.map(
            (item): SearchRecommendation => ({
                iconUrl: item.icon_url,
                name: item.name,
                type: item.type,
                slug: item.slug,
                productId: item.product_id,
                categoryId: item.category_id,
            }),
        );
    }
}
