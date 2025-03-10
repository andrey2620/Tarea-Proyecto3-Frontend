// import { CategoryFormComponent } from "./../../components/category/category-form/category-form.component";
import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { CategoryService } from "../../services/category.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
// import { CategoryListComponent } from "../../components/category/category-list/category-list.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ICategory } from "../../interfaces";

@Component({
  standalone: true,
  selector: "app-category-page",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    // CategoryComponent,
    ModalComponent,
    // CategoryComponent,
  ],
})
export class CategoryPageComponent {
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild("addCategoryListModal") public addCategoryListModal: any;
  public title: string = "Category List";
  public categoryListForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
  });

  /*   constructor() {
    this.categoryService.getAll();
  }

  saveCategoryList(item: ICategory) {
    this.categoryService.save(item);
    this.modalService.closeAll();
  }

  updateCategoryList(item: ICategory) {
    this.categoryService.update(item);
    this.modalService.closeAll();
  }

  callEdition(item: ICategory) {
    this.categoryListForm.controls["id"].setValue(
      item.id ? JSON.stringify(item.id) : ""
    );
    this.categoryListForm.controls["name"].setValue(item.name ? item.name : "");
    this.modalService.displayModal("md", this.addCategoryListModal);
  }

  deleteCategoryList(item: ICategory) {
    this.categoryService.delete(item);
  } */
}
