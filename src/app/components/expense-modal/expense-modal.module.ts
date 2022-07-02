import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExpenseModalComponent } from './expense-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExpenseModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [ExpenseModalComponent],
})
export class ExpenseModalModule { }
