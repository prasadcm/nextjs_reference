import type { ApiResponse } from '@/types/api';
import { RawSearchSuggestionResponse, SearchSuggestionResponse } from '@/types/searchSuggestionType';

import { injectable } from 'tsyringe';
import { isValidParam } from '../utils/queryParams';

@injectable()
export class SearchSuggestionService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.SEARCH_BASE_URL!;
    }

    async fetch(query: string): Promise<ApiResponse<unknown>> {
        if (!isValidParam(query)) {
            return { data: [] };
        }

        const res = await fetch(`${this.baseUrl}/search_suggestion?query=${query}`, { method: 'GET' });

        if (!res.ok) {
            throw new Error(`Search returned ${res.status}`);
        }

        const rawData = await res.json();
        const data = this.transform(rawData);
        return { data };
    }

    transform(raw: RawSearchSuggestionResponse): SearchSuggestionResponse {
        return {
            total: raw.total,
            results: raw.results.map((rawSuggestion) => ({
                iconUrl: rawSuggestion.icon_url,
                name: rawSuggestion.name,
                type: rawSuggestion.type,
                slug: rawSuggestion.slug,
                productId: rawSuggestion.product_id,
                categoryId: rawSuggestion.category_id,
            })),
        };
    }
}
