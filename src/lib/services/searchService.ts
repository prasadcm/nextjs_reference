import type { ApiResponse } from '@/types/api';
import type { RawSearchResponse, SearchResponse } from '@/types/searchResponse';

import { isValidParam } from '@lib/utils/queryParams';
import { injectable } from 'tsyringe';

@injectable()
export class SearchService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.SEARCH_BASE_URL!;
    }

    async fetchPreviouslySearched(params: {
        email?: string | null;
        phoneNumber?: string | null;
    }): Promise<ApiResponse<unknown>> {
        const queryParams = new URLSearchParams();
        if (isValidParam(params.email)) queryParams.append('email', params.email!);
        if (isValidParam(params.phoneNumber)) queryParams.append('phone_number', params.phoneNumber!);

        const res = await fetch(`${this.baseUrl}/previously_searched?${queryParams}`, { method: 'GET' });

        if (!res.ok) {
            throw new Error(`FastAPI returned ${res.status}`);
        }

        const rawData = await res.json();
        const data = this.transformSearchResponse(rawData);
        return { data };
    }

    transformSearchResponse(raw: RawSearchResponse): SearchResponse {
        return {
            total: raw.total,
            results: raw.results.map(({ searchText, ...rest }) => ({
                product: searchText,
                ...rest,
            })),
        };
    }
}
