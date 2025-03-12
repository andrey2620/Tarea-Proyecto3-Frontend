// import { inject, Injectable, signal } from "@angular/core";
// import { BaseService } from "./base-service";
// import { ISearch, ICategory } from "../interfaces";
// import { Observable, catchError, tap, throwError } from "rxjs";
// import { AlertService } from "./alert.service";

// @Injectable({
//   providedIn: "root",
// })
// export class CategoryService extends BaseService<ICategory> {
//   protected override source: string = 'categorias';
//   private categoryListSignal = signal<ICategory[]>([]);
//   get category$() {
//     return this.categoryListSignal;
//   }
//   public search: ISearch = {
//     page: 1,
//     size: 5
//   }
//   public totalItems: any = [];
//   private alertService: AlertService = inject(AlertService);

//   getAll() {
//     this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
//       next: (response: any) => {
//         this.search = { ...this.search, ...response.meta };
//         this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
//         this.categoryListSignal.set(response.data);
//       },
//       error: (err: any) => {
//         console.error('error', err);
//       }
//     });
//   }

//   save(category: ICategory) {
//     this.add(category).subscribe({
//       next: (response: any) => {
//         this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
//         this.getAll();
//       },
//       error: (err: any) => {
//         this.alertService.displayAlert('error', 'An error occurred adding the category', 'center', 'top', ['error-snackbar']);
//         console.error('error', err);
//       }
//     });
//   }

//   update(category: ICategory) {
//     this.editCustomSource(`${category.id}`, category).subscribe({
//       next: (response: any) => {
//         this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
//         this.getAll();
//       },
//       error: (err: any) => {
//         this.alertService.displayAlert('error', 'An error occurred updating the category', 'center', 'top', ['error-snackbar']);
//         console.error('error', err);
//       }
//     });
//   }

//   delete(category: ICategory) {
//     this.delCustomSource(`${category.id}`).subscribe({
//       next: (response: any) => {
//         this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
//         this.getAll();
//       },
//       error: (err: any) => {
//         this.alertService.displayAlert('error', 'An error occurred deleting the category', 'center', 'top', ['error-snackbar']);
//         console.error('error', err);
//       }
//     });
//   }
// }

import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { ISearch, ICategory } from "../interfaces";
import { AlertService } from "./alert.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService<ICategory> {
  protected override source: string = 'categorias';

  // Usamos Signals para almacenar y exponer la lista de categorías
  private categoryListSignal = signal<ICategory[]>([]);
  get category$() {
    return this.categoryListSignal;
  }

  // Control de paginación
  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: number[] = [];

  // Inyectamos AlertService para mostrar mensajes de éxito o error
  private alertService: AlertService = inject(AlertService);

  /**
   * Obtiene todas las categorías con parámetros de paginación
   */
  getAll(): void {
    this.findAllWithParams({ page: this.search.page, size: this.search.size })
      .subscribe({
        next: (response: any) => {
          // Actualizamos la paginación y guardamos la lista en el signal
          this.search = { ...this.search, ...response.meta };
          this.totalItems = Array.from(
            { length: this.search.totalPages ? this.search.totalPages : 0 },
            (_, i) => i + 1
          );
          this.categoryListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('Error al obtener categorías:', err);
        },
      });
  }

  /**
   * Crea una categoría nueva.
   * Suscribimos internamente y no devolvemos nada (void).
   */
  save(category: ICategory): void {
    this.add(category).subscribe({
      next: (response: any) => {
        // Mostramos alerta de éxito y refrescamos la lista
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        // Mostramos alerta de error
        this.alertService.displayAlert('error', 'An error occurred adding the category', 'center', 'top', ['error-snackbar']);
        console.error('Error al guardar categoría:', err);
      },
    });
  }

  /**
   * Actualiza una categoría existente.
   * También suscribimos internamente.
   */
  update(category: ICategory): void {
    this.editCustomSource(`${category.id}`, category).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the category', 'center', 'top', ['error-snackbar']);
        console.error('Error al actualizar categoría:', err);
      },
    });
  }

  /**
   * Elimina una categoría.
   * También suscribimos internamente.
   */
  delete(category: ICategory): void {
    this.delCustomSource(`${category.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the category', 'center', 'top', ['error-snackbar']);
        console.error('Error al eliminar categoría:', err);
      },
    });
  }
}
