import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../interfaces';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  public postSale(data: Sale) {
    return this.http.post(`${baseUrl}/sale`, data);
  }

  public getSalesByUserId(id: number) {
    return this.http.get(`${baseUrl}/sale/${id}?size=100`);
  }

  public getSaleDetails(saleId: number) {
    return this.http.get(`${baseUrl}/sale/details/${saleId}`);
  }
}
