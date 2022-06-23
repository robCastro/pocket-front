import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Expense, ListExpensesResponse } from '../interfaces/expenses';

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

}
