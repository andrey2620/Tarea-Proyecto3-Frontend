import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() categoryForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callUpdateMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  callSave() {
    let category: ICategory = {
      nombre: this.categoryForm.controls['nombre'].value,
      descripcion: this.categoryForm.controls['descripcion'].value,
      updatedAt: this.categoryForm.controls['updatedAt'].value,
    }
    if(this.categoryForm.controls['id'].value) {
      category.id = this.categoryForm.controls['id'].value;
    }
    if(category.id) {
      this.callUpdateMethod.emit(category);
    } else {
      this.callSaveMethod.emit(category);
    }
  }
}
