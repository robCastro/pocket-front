import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExpenseModalComponent } from 'src/app/components/expense-modal/expense-modal.component';
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
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.expenses$ = this.expenseService.getExpenses(1);
  }

  async mostrarModal(expense?: Expense) {
    const modal = this.modalController.create({
      component: ExpenseModalComponent,
      componentProps: { expense: expense },
    });
    (await modal).present();
  }

}
