import { Pagination } from "./pagination";

export interface ListCategoriesResponse extends Pagination {
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

export interface EditCategoryRequest {
    name: string;
    limit: number;
}

export interface CategoryWithExpended extends Category {
    expended: number;
}
