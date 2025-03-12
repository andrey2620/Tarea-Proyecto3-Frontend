import { Component, inject, ViewChild } from "@angular/core";
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory, IProducts } from '../../interfaces';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CategoryListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoryFormComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryPageComponent {
    public categoryService: CategoryService = inject(CategoryService);
    public modalService: ModalService = inject(ModalService);
    @ViewChild('addCategoryModal') public addCategoryModal: any;
    public fb: FormBuilder = inject(FormBuilder);
    categoryForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      productos: [<IProducts[]>[]],
      createdAt: [''],
      updatedAt: [''],
    })

    constructor() {
      this.categoryService.search.page = 1;
      this.categoryService.getAll();
    }

    saveCategory(category: ICategory) {
      this.categoryService.save(category);
      this.modalService.closeAll();
    }

    callEdition(category: ICategory) {
      this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
      this.categoryForm.controls['nombre'].setValue(category.nombre ? category.nombre : '');
      this.categoryForm.controls['descripcion'].setValue(category.descripcion ? category.descripcion : '');
      this.categoryForm.controls['productos'].setValue(category.productos ? category.productos : <IProducts[]>[]);
      this.modalService.displayModal('md', this.addCategoryModal);
    }

    updateCategory(category: ICategory) {
      this.categoryService.update(category);
      this.modalService.closeAll();
    }
}
