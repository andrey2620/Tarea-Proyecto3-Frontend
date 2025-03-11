import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IProducts, IFeedbackStatus } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() productsForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();
  @Output() callUpdateMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();

  callSave() {
    let product: IProducts = {
      nombre: this.productsForm.controls['nombre'].value,
      descripcion: this.productsForm.controls['descripcion'].value,
      precio: this.productsForm.controls['precio'].value,
      cantidadStock: this.productsForm.controls['cantidadStock'].value,
      categoria: this.productsForm.controls['categoria'].value,
      updatedAt: this.productsForm.controls['updatedAt'].value,
    }
    if(this.productsForm.controls['id'].value) {
      product.id = this.productsForm.controls['id'].value;
    }
    if(product.id) {
      this.callUpdateMethod.emit(product);
    } else {
      this.callSaveMethod.emit(product);
    }
  }
}
