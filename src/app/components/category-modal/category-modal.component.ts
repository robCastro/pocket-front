import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category, CreateCategoryRequest, EditCategoryRequest } from 'src/app/interfaces/categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {

  categoryForm!: FormGroup;

  @Input()
  category?: Category;

  titulo = '';

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.titulo = (this.category) ? 'Editar Categoría' : 'Nueva Categoría';
    this.categoryForm = this.fb.group({
      id: [this.category?.id || ''],
      name: [this.category?.name || '', Validators.required],
      limit: [this.category?.limit || '', [Validators.required, Validators.min(0.01)]],
    });
  }

  public get name(): AbstractControl {
    return this.categoryForm.get('name');
  }

  public get limit(): AbstractControl {
    return this.categoryForm.get('limit');
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.categoryForm.status != 'VALID') {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const response$ = (this.category) ? this.editCategory() : this.createCategory();
    response$.subscribe(() => this.modalController.dismiss());
  }

  private createCategory(): Observable<CreateCategoryRequest> {
    const request: CreateCategoryRequest = {
      name: this.name.value,
      limit: this.limit.value,
    }
    return this.categoryService.createCategory(request);
  }

  private editCategory(): Observable<EditCategoryRequest> {
    const request: EditCategoryRequest = {
      name: this.name.value,
      limit: this.limit.value,
    }
    return this.categoryService.editCategory(this.category.id, request);
  }

}
