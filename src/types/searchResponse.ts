import type { SearchItem, SearchItemRaw } from '@/types/searchItem';

export type RawSearchResponse = {
    total: number;
    results: SearchItemRaw[];
};

export type SearchResponse = {
    total: number;
    results: SearchItem[];
};
