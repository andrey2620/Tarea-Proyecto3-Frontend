import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory, IProducts } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() products: IProducts[] = [];
  @Output() callModalAction = new EventEmitter<IProducts>();
  @Output() callDeleteAction = new EventEmitter<IProducts>();

  public categoriesList: { id: number; nombre: string }[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll();
    // category$() ya retorna un arreglo, por lo que asignamos directamente:
    this.categoriesList = this.categoryService.category$()
      .filter((cat: ICategory): cat is ICategory & { id: number } => cat.id !== undefined)
      .map(cat => ({ id: cat.id, nombre: cat.nombre }));
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      // Sólo filtra para asegurarse de que sean objetos
      this.products = this.products.filter(prod => typeof prod === 'object');
      console.log('Productos recibidos:', this.products);
      // No normalizamos aquí; dejamos que el helper en el template lo maneje.
    }
  }

  // Helper para obtener el nombre de la categoría
  getCategoryName(
    categoria: number | { id: number; nombre: string } | (number | { id: number; nombre: string })[] | undefined
  ): string {
    if (!categoria) return 'Sin categoría';

    if (Array.isArray(categoria)) {
      const names = categoria.map(cat => {
        if (typeof cat === 'object' && cat.nombre) {
          return cat.nombre;
        } else if (typeof cat === 'number') {
          const found = this.categoriesList.find(c => c.id === cat);
          return found ? found.nombre : cat.toString();
        }
        return 'Desconocido';
      });
      return names.join(', ');
    } else {
      if (typeof categoria === 'object' && categoria.nombre) {
        return categoria.nombre;
      } else if (typeof categoria === 'number') {
        const found = this.categoriesList.find(cat => cat.id === categoria);
        return found ? found.nombre : categoria.toString();
      }
    }
    return 'Desconocido';
  }

  trackByProductId(index: number, product: IProducts): number {
    return product.id || -1;
  }
}