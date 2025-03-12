// import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
// import { IProducts, IFeedbackStatus } from '../../../interfaces';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-products-form',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     CommonModule,
//   ],
//   templateUrl: './products-form.component.html',
//   styleUrl: './products-form.component.scss'
// })
// export class ProductsFormComponent {
//   public fb: FormBuilder = inject(FormBuilder);
//   @Input() productsForm!: FormGroup;

//   @Output() callSaveMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();
//   @Output() callUpdateMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();




//   callSave() {
//     let product: IProducts = {
//       nombre: this.productsForm.controls['nombre'].value,
//       descripcion: this.productsForm.controls['descripcion'].value,
//       precio: this.productsForm.controls['precio'].value,
//       cantidadStock: this.productsForm.controls['cantidadStock'].value,
//       categoria: this.productsForm.controls['categoria'].value,
//       updatedAt: this.productsForm.controls['updatedAt'].value,
//     }
//     if(this.productsForm.controls['id'].value) {
//       product.id = this.productsForm.controls['id'].value;
//     }
//     if(product.id) {
//       this.callUpdateMethod.emit(product);
//     } else {
//       this.callSaveMethod.emit(product);
//     }
//   }
// }


// import { HttpClient } from '@angular/common/http';
// import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { map } from 'rxjs';
// import { IProducts } from '../../../interfaces';

// @Component({
//   selector: 'app-products-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './products-form.component.html',
//   styleUrls: ['./products-form.component.scss']
// })
// export class ProductsFormComponent implements OnInit {
//   fb = inject(FormBuilder);
//   http = inject(HttpClient);

//   @Input() productsForm!: FormGroup;
//   @Output() callSaveMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();
//   @Output() callUpdateMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();
//   // Con toSignal convertimos el observable de la API en un signal
//   // Reemplaza 'URL_DE_TU_API/categorias' con la ruta real de tu API
//   // Convertimos la respuesta de la API y extraemos la propiedad "data" que contiene el array de categorías.
//   categories = toSignal(
//     this.http.get<any>('categorias').pipe(
//       map(response => response.data)
//     ),
//     { initialValue: [] }
//   );


//   ngOnInit(): void {
//     // Puedes realizar otras inicializaciones si es necesario
//   }


//   callSave(): void {
//     const product: IProducts = {
//       id: this.productsForm.value.id,
//       nombre: this.productsForm.value.nombre,
//       descripcion: this.productsForm.value.descripcion,
//       precio: this.productsForm.value.precio,
//       cantidadStock: this.productsForm.value.cantidadStock,
//       categoria: {
//         // El control 'categoria' es un number, así que lo envuelves en un objeto
//         id: this.productsForm.value.categoria
//       },
//       updatedAt: this.productsForm.value.updatedAt
//     };

//     // Decide si guardar o actualizar
//     if (product.id) {
//       // update
//       this.callUpdateMethod.emit(product);
//     } else {
//       // create
//       this.callSaveMethod.emit(product);
//     }
//   }
// }

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProducts } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent {
  fb = inject(FormBuilder);

  // FormGroup que viene desde el padre
  @Input() productsForm!: FormGroup;

  // Estos outputs deben existir si en tu plantilla los estás escuchando
  @Output() callSaveMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();
  @Output() callUpdateMethod: EventEmitter<IProducts> = new EventEmitter<IProducts>();

  // Declaramos un arreglo para almacenar las categorías
  public categoriesList: Array<{ id: number, nombre: string }> = [];

  constructor(private categoryService: CategoryService) { }

  // En el componente:
  public categoriesSignal = this.categoryService.category$;

// Suponiendo que llamas a getAll() para llenar el signal
ngOnInit(): void {
  this.categoryService.getAll();
  // Extraer el valor actual del signal y mapearlo, usando ! para afirmar que id no es undefined.
  this.categoriesList = this.categoryService.category$().map(cat => ({
    id: cat.id!,  // Aseguramos que 'id' está definido
    nombre: cat.nombre
  }));
}


  // Agregamos la función categories() que se usará en el template
  public categories() {
    return this.categoriesList;
  }

  callSave(): void {
    const formValue = this.productsForm.value;
    // Aseguramos que el valor se convierta a número
    const categoryId = Number(formValue.categoria);
    // Busca en el arreglo de categorías el objeto que tenga el id seleccionado
    const selectedCategory = this.categoriesList.find(cat => cat.id === categoryId);

    if (!selectedCategory) {
      console.error('Categoría no encontrada');
      return;
    }

    const product: IProducts = {
      id: formValue.id,
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      precio: formValue.precio,
      cantidadStock: formValue.cantidadStock,
      // Se asigna el objeto completo que incluye id y nombre
      categoria: selectedCategory,
      updatedAt: formValue.updatedAt,
    };

    if (product.id) {
      this.callUpdateMethod.emit(product);
    } else {
      this.callSaveMethod.emit(product);
    }
  }


  // callSave(): void {
  //   // Construye el objeto de producto con los valores del formulario
  //   const product: IProducts = {
  //     id: this.productsForm.value.id,
  //     nombre: this.productsForm.value.nombre,
  //     descripcion: this.productsForm.value.descripcion,
  //     precio: this.productsForm.value.precio,
  //     cantidadStock: this.productsForm.value.cantidadStock,
  //     // Tu API pide { "id": <número> } para la categoría
  //     categoria: this.productsForm.value.categoria,
  //     updatedAt: this.productsForm.value.updatedAt,
  //   };

  //   // Si tiene id, lo consideramos un update, de lo contrario, un create
  //   if (product.id) {
  //     this.callUpdateMethod.emit(product);
  //   } else {
  //     this.callSaveMethod.emit(product);
  //   }
  // }
}