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

  private expensesSubject: BehaviorSubject<Expense[] | undefined> = new BehaviorSubject(undefined);
  private lastPageReached: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private paginationSubscription?: Subscription;
  private findSubscription?: Subscription;
  private currentPage = 0;
  private endpoint = environment.backend + 'expenses/api/v1/expenses/';

  constructor(private httpClient: HttpClient) { }

  destroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    this.paginationSubscription?.unsubscribe();
    this.findSubscription?.unsubscribe();
  }

  watchExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  watchLastPageReached(): Observable<boolean> {
    return this.lastPageReached.asObservable();
  }

  getExpenses(currentPage: number): Observable<ListExpensesResponse> {
    const url = this.endpoint + '?page=' + currentPage;
    return this.httpClient.get<ListExpensesResponse>(url).pipe(
      tap(response => console.log(`Response de get expenses con ${url}`, response)),
    );
  }

}
