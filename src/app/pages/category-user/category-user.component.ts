import { CategoryUserListComponent } from '../../components/category-user/category-user-list/category-user-list.component';
import { CategoryService } from '../../services/category.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-user',
  standalone: true,
  imports: [CommonModule, CategoryUserListComponent, PaginationComponent],
  templateUrl: './category-user.component.html',
  styleUrls: ['./category-user.component.scss']
})
export class CategoryUserComponent {
  // El servicio se declara public para poder acceder desde el template.
  constructor(public categoryService: CategoryService) { }
}
