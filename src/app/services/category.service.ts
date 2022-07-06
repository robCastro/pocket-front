import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryWithExpended, CreateCategoryRequest, EditCategoryRequest, ListCategoriesResponse } from '../interfaces/categories';

import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories: Category[] = [];
  
  private endpoint = environment.backend + 'expenses/api/v1/categories/';

  constructor(private httpClient: HttpClient) {
    this.getCategories();
  }

  private getCategories() {
    this.httpClient.get<ListCategoriesResponse>(this.endpoint).subscribe(res => this.categories = res.results);
  }
  
  public createCategory(request: CreateCategoryRequest): Observable<Category> {
    return this.httpClient.post<Category>(this.endpoint, request).pipe(
      tap(response => console.log('Response de crear category', response)),
      tap(category => this.categories.push(category)),
    );
  }

  public editCategory(id: number, request: EditCategoryRequest): Observable<Category> {
    const url = this.endpoint + id + '/';
    return this.httpClient.put<Category>(url, request).pipe(
      tap(response => console.log('Response de editar category', response)),
      tap(newCategory => {
        const index = this.categories.findIndex(category => category.id == newCategory.id);
        if (index == -1) {
          return;
        }
        this.categories.splice(index, 1, newCategory);
      }),
    );
  }

  public deleteCategory(id: number): Observable<any> {
    const url = this.endpoint + id + '/';
    return this.httpClient.delete(url).pipe(
      tap(response => console.log('Response de eliminar category', response)),
      tap(() => {
        const index = this.categories.findIndex(category => category.id == id);
        if (index == -1) {
          return;
        }
        this.categories.splice(index, 1);
      })
    )
  }

  public getOverview(): Observable<CategoryWithExpended[]> {
    const url = this.endpoint + 'overview/'
    return this.httpClient.get<CategoryWithExpended[]>(url).pipe(
      tap(response => console.log('Response recibido de overview', response)),
    );
  }
}
