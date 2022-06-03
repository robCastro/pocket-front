import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModalComponent } from './category-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CategoryModalComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [CategoryModalComponent]
})
export class CategoryModalModule { }
