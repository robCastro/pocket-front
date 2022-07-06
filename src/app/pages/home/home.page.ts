import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ExpenseModalComponent } from 'src/app/components/expense-modal/expense-modal.component';
import { CategoryWithExpended } from 'src/app/interfaces/categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  categories: CategoryWithExpended[] = [];

  totalExpended = 0;
  totalLimit = 0;

  private subscription?: Subscription;

  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log('Init');
    this.loadCategories();
  }

  ngOnDestroy() {
    console.log('Destroy');
    this.subscription?.unsubscribe();
  }

  loadCategories(event?: any) {
    this.subscription?.unsubscribe();
    this.subscription = this.categoryService.getOverview().subscribe(response => {
      this.categories = response;
      this.totalExpended = 0;
      this.totalLimit = 0;
      this.categories.forEach(category => {
        this.totalExpended += Number(category.expended);
        this.totalLimit += Number(category.limit);
      });
      event?.target.complete()
    });
  }

  async addExpense() {
    const modal = this.modalController.create({ component: ExpenseModalComponent });
    (await modal).present();
    (await modal).onWillDismiss().then(() => this.loadCategories());
  }

}
