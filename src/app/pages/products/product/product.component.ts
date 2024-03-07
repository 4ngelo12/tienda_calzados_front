import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/core/interfaces';
import { ProductsService } from 'src/app/core/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id?: string;
  productData: Products = {} as Products;
  quantity: number = 1;

  constructor(private prodService: ProductsService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id')!;
    this.prodService.getProductById(Number(this.id)).subscribe({
      next: (res: any) => {
        this.productData = res;
      }
    });
  }

  // Modificar la cantidad de productos
  addQuantity() {
    if (this.quantity < this.productData.stock) {
      this.quantity++;
    }
  }

  removeQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
