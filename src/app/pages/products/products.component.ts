import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild} from "@angular/core";
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
  styleUrl: './products.component.scss'
})
export class ProductsPageComponent {
    public productsService: ProductsService = inject(ProductsService);
    public modalService: ModalService = inject(ModalService);
    @ViewChild('addProductsModal') public addProductsModal: any;
    public fb: FormBuilder = inject(FormBuilder);
    productsForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', Validators.required],
      cantidadStock: ['', Validators.required],
      categoria: ['', Validators.required],
      updatedAt: [''],
    })

    constructor() {
      this.productsService.search.page = 1;
      this.productsService.getAll();
    }

    saveProducts(products: IProducts) {
      this.productsService.save(products);
      this.modalService.closeAll();
    }

    callEdition(products: IProducts) {
      this.productsForm.controls['id'].setValue(products.id ? JSON.stringify(products.id) : '');
      this.productsForm.controls['nombre'].setValue(products.nombre ? products.nombre : '');
      this.productsForm.controls['descripcion'].setValue(products.descripcion ? products.descripcion : '');
      this.productsForm.controls['precio'].setValue(products.precio ? JSON.stringify(products.precio) : '');
      this.productsForm.controls['cantidadStock'].setValue(products.cantidadStock ? JSON.stringify(products.cantidadStock) : '');
      this.productsForm.controls['categoria'].setValue(products.categoria ? JSON.stringify(products.categoria) : '');
      this.modalService.displayModal('md', this.addProductsModal);
    }

    updateProducts(products: IProducts) {
      this.productsService.update(products);
      this.modalService.closeAll();
    }
}
