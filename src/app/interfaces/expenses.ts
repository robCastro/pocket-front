import { Category } from "./categories";
import { Pagination } from "./pagination";

export interface ListExpensesResponse extends Pagination {
    results: Expense[];
}


export interface Expense {
    id: number;
    comment: string;
    amount: number;
    date: string;
    category: Category;
}