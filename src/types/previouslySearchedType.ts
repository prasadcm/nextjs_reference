export type PreviouslySearchedItemRaw = {
    icon_url: string;
    search_text: string;
    type: string;
    slug: string;
    product_id: string;
    category_id: string;
};

export type PreviouslySearchedItem = {
    iconUrl: string;
    searchText: string;
    type: string;
    slug: string;
    productId: string;
    categoryId: string;
};

export type RawPreviouslySearchedResponse = {
    total: number;
    results: PreviouslySearchedItemRaw[];
};

export type PreviouslySearchedResponse = PreviouslySearchedItem[];
