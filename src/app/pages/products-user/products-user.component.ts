import { ProductsService } from '../../services/products.service';
import { ProductsUserListComponent } from '../../components/products-user/products-user-list/products-user-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-user',
  standalone: true,
  imports: [CommonModule, ProductsUserListComponent, PaginationComponent],
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.scss']
})
export class ProductsUserComponent {
  constructor(public productsService: ProductsService) { }
}
