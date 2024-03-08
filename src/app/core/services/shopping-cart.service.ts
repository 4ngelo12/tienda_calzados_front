import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartResponse } from '../interfaces';
import { BehaviorSubject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCart: ShoppingCart[] = [];
  private _product: BehaviorSubject<ShoppingCart[]> = new BehaviorSubject<ShoppingCart[]>([]);
  public cartResponse: ShoppingCartResponse = {} as ShoppingCartResponse;

  constructor(private http: HttpClient) { }

  public postShoppingCart(data: ShoppingCart) {
    this.shoppingCart.push(data);
    this._product.next(this.shoppingCart);
    return this.http.post(`${baseUrl}/shoppingcart`, data);
  }

  public getShoppingCartById(id: number) {
    return this.http.get(`${baseUrl}/shoppingcart/${id}`);
  }

  public getShoppingCart() {
    return this.http.get(`${baseUrl}/shoppingcart`);
  }

  public get getCart() {
    return this._product.asObservable();
  }
}
