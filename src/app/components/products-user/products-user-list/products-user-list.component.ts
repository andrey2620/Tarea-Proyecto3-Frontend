import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProducts } from '../../../interfaces';

@Component({
  selector: 'app-products-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-user-list.component.html'
})
export class ProductsUserListComponent {
  // Definimos el Input para recibir la lista de productos
  @Input() products: IProducts[] = [];

  // Método trackBy para optimizar el *ngFor*
  trackByProductId(index: number, product: IProducts): number {
    return product.id || -1;
  }

  // Método helper para obtener el nombre de la categoría.
  // Si la categoría ya es un objeto con propiedad "nombre", se devuelve directamente.
  // Si es un número, se devuelve el mismo número como string (o podrías implementar lógica de búsqueda en un mapa).
  getCategoryName(
    categoria: number | { id: number; nombre: string } | (number | { id: number; nombre: string })[] | undefined
  ): string {
    if (!categoria) return 'Sin categoría';

    if (Array.isArray(categoria)) {
      const names = categoria.map(cat => {
        if (typeof cat === 'object' && cat.nombre) {
          return cat.nombre;
        } else if (typeof cat === 'number') {
          // Aquí podrías consultar un mapa de categorías o simplemente convertir el número a string.
          return cat.toString();
        }
        return 'Desconocido';
      });
      return names.join(', ');
    } else {
      if (typeof categoria === 'object' && categoria.nombre) {
        return categoria.nombre;
      } else if (typeof categoria === 'number') {
        return categoria.toString();
      }
    }
    return 'Desconocido';
  }

}
