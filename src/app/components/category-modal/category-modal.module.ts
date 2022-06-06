import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModalComponent } from './category-modal.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CategoryModalComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [CategoryModalComponent]
})
export class CategoryModalModule { }
