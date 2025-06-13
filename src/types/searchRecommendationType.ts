export type RawSearchRecommendation = {
    icon_url: string;
    name: string;
    type: string;
    slug: string;
    product_id: string;
    category_id: string;
};

export type SearchRecommendation = {
    iconUrl: string;
    name: string;
    type: string;
    slug: string;
    productId: string;
    categoryId: string;
};

export type RawSearchRecommendationResponse = {
    total: number;
    results: RawSearchRecommendation[];
};

export type SearchRecommendationResponse = SearchRecommendation[];
