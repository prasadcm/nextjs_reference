import type { ApiResponse } from '@/types/api';
import {
    PreviouslySearchedItem,
    PreviouslySearchedResponse,
    RawPreviouslySearchedResponse,
} from '@/types/previouslySearchedType';

import { isValidParam } from '@lib/utils/queryParams';
import { injectable } from 'tsyringe';

@injectable()
export class PreviouslySearchedService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.SEARCH_BASE_URL!;
    }

    async fetch(params: { email?: string | null; phoneNumber?: string | null }): Promise<ApiResponse<unknown>> {
        const queryParams = new URLSearchParams();
        if (isValidParam(params.email)) queryParams.append('email', params.email!);
        if (isValidParam(params.phoneNumber)) queryParams.append('phone_number', params.phoneNumber!);

        const res = await fetch(`${this.baseUrl}/previously_searched?${queryParams}`, { method: 'GET' });

        if (!res.ok) {
            throw new Error(`Search returned ${res.status}`);
        }

        const rawData = await res.json();
        const data = this.transform(rawData);
        return { data };
    }

    transform(raw: RawPreviouslySearchedResponse): PreviouslySearchedResponse {
        return raw.results.map(
            (item): PreviouslySearchedItem => ({
                iconUrl: item.icon_url,
                searchText: item.search_text,
                type: item.type,
                slug: item.slug,
                productId: item.product_id,
                categoryId: item.category_id,
            }),
        );
    }
}
