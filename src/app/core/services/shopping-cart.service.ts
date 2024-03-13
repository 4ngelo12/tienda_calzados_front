import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient) { }

  public postShoppingCart(data: ShoppingCart) {
    return this.http.post(`${baseUrl}/shoppingcart`, data);
  }

  public getShoppingCartByUserId(id: number) {
    return this.http.get(`${baseUrl}/shoppingcart/${id}`);
  }

  public deleteShoppingCart(id: number) {
    return this.http.delete(`${baseUrl}/shoppingcart/${id}`);
  }

  public getShoppingCart() {
    return this.http.get(`${baseUrl}/shoppingcart`);
  }

  public deleteShoppingCartByUserId(id: number) {
    return this.http.delete(`${baseUrl}/shoppingcart/user/${id}`);
  }
}
