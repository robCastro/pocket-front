import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CreateExpenseRequest, EditExpenseRequest, Expense } from 'src/app/interfaces/expenses';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.scss'],
})
export class ExpenseModalComponent implements OnInit {

  expenseForm!: FormGroup;

  @Input()
  expense?: Expense;

  titulo = '';

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    public categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.titulo = (this.expense) ? 'Editar Gasto' : 'Nueva Gasto';
    this.expenseForm = this.fb.group({
      id: [this.expense?.id || ''],
      comment: [this.expense?.comment || ''],
      amount: [this.expense?.amount || '', [Validators.required, Validators.min(0.01)]],
      date: [this.expense?.date || '', Validators.required],
      category_id: [this.expense?.category.id || '', Validators.required],
    });
  }

  public get comment(): AbstractControl {
    return this.expenseForm.get('comment');
  }

  public get amount(): AbstractControl {
    return this.expenseForm.get('amount');
  }

  public get date(): AbstractControl {
    return this.expenseForm.get('date');
  }

  public get category_id(): AbstractControl {
    return this.expenseForm.get('category_id');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.expenseForm.status != 'VALID') {
      this.expenseForm.markAllAsTouched();
      console.log('Not valid');
      return;
    }
    const response$ = (this.expense) ? this.editExpense() : this.createExpense();
    response$.subscribe((expense) => this.modalController.dismiss({ expense: expense, created: !(this.expense) }));
  }

  private createExpense(): Observable<Expense> {
    const request: CreateExpenseRequest = {
      comment: this.comment.value,
      amount: this.amount.value,
      date: this.date.value,
      category_id: this.category_id.value,
    }
    return this.expenseService.createExpense(request);
  }

  private editExpense(): Observable<Expense> {
    const request: EditExpenseRequest = {
      comment: this.comment.value,
      amount: this.amount.value,
      date: this.date.value,
      category_id: this.category_id.value,
    }
    return this.expenseService.editExpense(this.expense.id, request);
  }

}
