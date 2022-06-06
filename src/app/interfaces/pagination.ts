export interface Pagination {
    count: number;
    next: number | null;
    previous: number | null;
    results: Iterable<any>;
}