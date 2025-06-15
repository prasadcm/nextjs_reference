export type RawSearchSuggestion = {
    icon_url: string;
    name: string;
    type: string;
    slug: string;
    product_id: string;
    category_id: string;
};

export type SearchSuggestion = {
    iconUrl: string;
    name: string;
    type: string;
    slug: string;
    productId: string;
    categoryId: string;
};

export type RawSearchSuggestionResponse = {
    total: number;
    results: RawSearchSuggestion[];
};

export type SearchSuggestionResponse = {
    total: number;
    results: SearchSuggestion[];
};
