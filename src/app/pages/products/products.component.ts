import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  standalone: true,
  selector: "app-products-page",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    ModalComponent,
    // ProductsComponent,
  ],
})
export class ProductsPageComponent {}
