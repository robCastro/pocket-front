import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateExpenseRequest, EditExpenseRequest, Expense, ListExpensesResponse } from '../interfaces/expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private endpoint = environment.backend + 'expenses/api/v1/expenses/';

  constructor(private httpClient: HttpClient) { }

  // TODO: Manejar paginacion
  getExpenses(currentPage: number): Observable<Expense[]> {
    const url = this.endpoint + '?page=' + currentPage;
    return this.httpClient.get<ListExpensesResponse>(url).pipe(
      tap(response => console.log(`Response de get expenses con ${url}`, response)),
      map(response => response.results)
    );
  }

  createExpense(request: CreateExpenseRequest): Observable<Expense> {
    const url = this.endpoint;
    return this.httpClient.post<Expense>(url, request).pipe(
      tap(response => console.log(`Response de create expenses con ${url}`, response)),
    )
  }

  public editExpense(id: number, request: EditExpenseRequest): Observable<Expense> {
    const url = this.endpoint + id + '/';
    return this.httpClient.put<Expense>(url, request).pipe(
      tap(response => console.log(`Response de editar Expense con ${url}`, response)),
    );
  }

}
