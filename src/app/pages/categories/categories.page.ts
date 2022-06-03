import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryModalComponent } from 'src/app/components/category-modal/category-modal.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(
    public categoryService: CategoryService,
    public modalController: ModalController,
  ) { }

  ngOnInit() { }

  async mostrarModalCrear() {
    const modal = this.modalController.create({
      component: CategoryModalComponent,
    });
    return (await modal).present()
  }
}
