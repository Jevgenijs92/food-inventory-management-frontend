import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(protected http: HttpClient) {}

  protected productsUrl = `${environment.baseUrl}/products`;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.productsUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.productsUrl}/${id}`);
  }
}
