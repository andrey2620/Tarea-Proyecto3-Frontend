import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ICategory, IResponse, ISearch } from "../interfaces";
import { Observable } from "rxjs";
import { BaseService } from "./base-service";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends BaseService<ICategory> {
  private apiUrl = "http://localhost:8080/categorias";

  /*   constructor(protected http: HttpClient) {
    super();
  }

  get(): Observable<IResponse<ISearch>> {
    return this.http.get<IResponse<ISearch>>(this.apiUrl);
  }

  create(category: ICategory): Observable<IResponse<ICategory>> {
    return this.http.post<IResponse<ICategory>>(this.apiUrl, category);
  }

  update(category: ICategory): Observable<IResponse<ICategory>> {
    return this.http.put<IResponse<ICategory>>(
      `${this.apiUrl}/${category.id}`,
      category
    );
  }

  delete(id: number): Observable<IResponse<null>> {
    return this.http.delete<IResponse<null>>(`${this.apiUrl}/${id}`);
  } */
}
