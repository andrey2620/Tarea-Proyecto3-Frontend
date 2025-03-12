import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-user-list.component.html',
})
export class CategoryUserListComponent {
  @Input() category: ICategory[] = [];

  trackByCategoryId(index: number, cat: ICategory): number {
    return cat.id ?? -1;
  }
}
