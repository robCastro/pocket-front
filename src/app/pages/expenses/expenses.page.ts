import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Expense } from 'src/app/interfaces/expenses';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  private currentPage$ = new BehaviorSubject<number>(1);

  public currentPageData$: Observable<Expense[]> = this.currentPage$.pipe(
    switchMap(currentPage => this.expenseService.getExpenses(currentPage)),
    map(response => response.results)
  )

  constructor(
    public expenseService: ExpenseService,
  ) { }

  ngOnInit() {
  }

  nextPage(event: any) {
    this.currentPage$.next(this.currentPage$.value + 1);
    event.target.complete();
  }

}
