import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateCategoryRequest } from 'src/app/interfaces/categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      limit: ['', [Validators.required, Validators.min(0.01)]],
    })
  }

  ngOnInit() { }

  public get name(): AbstractControl {
    return this.categoryForm.get('name');
  }

  public get limit(): AbstractControl {
    return this.categoryForm.get('limit');
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

  guardar() {
    if (this.categoryForm.status != 'VALID') {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const request: CreateCategoryRequest = {
      name: this.name.value,
      limit: this.limit.value,
    }
    this.categoryService.createCategory(request).subscribe(() => {
      this.modalController.dismiss();
    });
  }

}
