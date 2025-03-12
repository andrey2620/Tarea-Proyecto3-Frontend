import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { ISearch, IProducts } from "../interfaces";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AlertService } from "./alert.service";
@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseService<IProducts> {
  protected override source: string = 'productos';
  private productsListSignal = signal<IProducts[]>([]);
  get products$() {
    return this.productsListSignal;
  }
  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.productsListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

    save(products: IProducts) {
    this.add(products).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the products', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }


  update(products: IProducts) {
    this.editCustomSource(`${products.id}`, products).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the products', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }


  delete(products: IProducts) {
    this.delCustomSource(`${products.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the products', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}