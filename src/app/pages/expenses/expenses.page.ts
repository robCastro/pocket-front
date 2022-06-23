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

  expenses$: Observable<Expense[]>;

  constructor(
    public expenseService: ExpenseService,
  ) { }

  ngOnInit() {
    this.expenses$ = this.expenseService.getExpenses(1);
  }

}
