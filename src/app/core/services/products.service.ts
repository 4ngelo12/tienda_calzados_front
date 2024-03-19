import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products, ProductsResponse } from '../interfaces';
import { Observable, map } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Products[]> {
    return this.http.get<ProductsResponse>(`${baseUrl}/products?size=8`)
      .pipe(
        map( this.transformData)
      );
  }

  private transformData(resp: ProductsResponse) {
    const products: Products[] = resp.content.map( product => {
      return {
        id: product.id,
        active: product.active,
        code: product.code,
        name: product.name,
        description: product.description,
        image: product.image,
        size: product.size,
        brand: product.brand,
        purchase_price: product.purchase_price,
        sale_price: product.sale_price,
        stock: product.stock,
        category: product.category
      }
    })
    return products;
  }

  public getProductById(id: number) {
    return this.http.get(`${baseUrl}/products/${id}`)
  }
}
