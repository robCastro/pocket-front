import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
    console.log('Enviar request');
  }

}
