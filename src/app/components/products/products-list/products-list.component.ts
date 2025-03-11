import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalComponent } from '../../modal/modal.component';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { IProducts } from '../../../interfaces';
// import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input() title: string = '';
  @Input() products: IProducts[] = [];
  @Output() callModalAction: EventEmitter<IProducts> = new EventEmitter<IProducts>();
  @Output() callDeleteAction: EventEmitter<IProducts> = new EventEmitter<IProducts>();
}
