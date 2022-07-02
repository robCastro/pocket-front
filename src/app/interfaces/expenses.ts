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


export interface CreateExpenseRequest {
    comment: string,
	amount: number,
	date: Date,
	category_id: number,
}

export interface EditExpenseRequest {
    comment: string,
	amount: number,
	date: Date,
	category_id: Category,
}