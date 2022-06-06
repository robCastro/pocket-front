export interface ListCategoriesResponse {
    count: number;
    next: number | null;
    previous: number | null;
    results: Category[];
}

export interface Category {
    id: number;
    name: string;
    limit: number;
}

export interface CreateCategoryRequest {
    name: string;
    limit: number;
}