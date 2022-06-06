import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { CategoryModalModule } from 'src/app/components/category-modal/category-modal.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CategoriesPageRoutingModule,
    CategoryModalModule,
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
