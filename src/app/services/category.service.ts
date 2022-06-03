import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, ListCategoriesResponse } from '../interfaces/categories';

import { map, tap } from "rxjs/operators";

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
}
