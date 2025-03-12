import { CommonModule } from "@angular/common";
import { Component, inject, TemplateRef, ViewChild} from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';
import { ProductsFormComponent } from '../../components/products/products-form/products-form.component';
import { ProductsListComponent } from '../../components/products/products-list/products-list.component';
import { FormBuilder, Validators } from '@angular/forms';
import { IProducts } from '../../interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductsListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductsFormComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsPageComponent {
    public productsService: ProductsService = inject(ProductsService);
    public modalService: ModalService = inject(ModalService);
    @ViewChild('addProductsModal', { static: true }) addProductsModal!: TemplateRef<any>;
    public fb: FormBuilder = inject(FormBuilder);
    productsForm = this.fb.group({
      id: this.fb.control<number>(0),
      nombre: this.fb.control<string>(''),
      descripcion: this.fb.control<string>(''),
      precio: this.fb.control<number>(0),
      cantidadStock: this.fb.control<number>(0),
      categoria: this.fb.control<number>(0), // sólo el id
      updatedAt: this.fb.control<string>('')
    });


    constructor() {
      this.productsService.search.page = 1;
      this.productsService.getAll();
    }

    saveProducts(products: IProducts) {
      this.productsService.save(products);
      this.modalService.closeAll();
    }

    callEdition(product: IProducts) {
      // Asegura tipos para cada campo
      this.productsForm.controls['id'].setValue(product.id ?? 0);
      this.productsForm.controls['nombre'].setValue(product.nombre ?? '');
      this.productsForm.controls['descripcion'].setValue(product.descripcion ?? '');
      this.productsForm.controls['precio'].setValue(product.precio ?? 0);
      this.productsForm.controls['cantidadStock'].setValue(product.cantidadStock ?? 0);

      // Si product.categoria es un objeto, extrae el id.
      // Si es simplemente un número, lo asignas directamente.
      if (typeof product.categoria === 'object') {
        // Maneja la posibilidad de que 'id' sea undefined
        this.productsForm.controls['categoria'].setValue(this.getCategoriaId(product.categoria) ?? 0);
      } else {
        // En caso de que 'categoria' sea number
        this.productsForm.controls['categoria'].setValue(product.categoria ?? 0);
      }

      this.productsForm.controls['updatedAt'].setValue(product.updatedAt ?? '');

      // Finalmente, abre el modal
      this.modalService.displayModal('md', this.addProductsModal);
    }
    getCategoriaId(
      categoria: number | { id: number; nombre: string } | (number | { id: number; nombre: string })[]
    ): number | undefined {
      if (Array.isArray(categoria)) {
        // Si es un arreglo, devolvemos el id del primer elemento (si existe)
        if (categoria.length > 0) {
          const first = categoria[0];
          return typeof first === 'number' ? first : first.id;
        } else {
          return undefined;
        }
      } else if (typeof categoria === 'number') {
        return categoria;
      } else {
        return categoria.id;
      }
    }


    updateProducts(products: IProducts) {
      this.productsService.update(products);
      this.modalService.closeAll();
    }
}
