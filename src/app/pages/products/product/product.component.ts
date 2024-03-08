import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products, ShoppingCart, ShoppingCartResponse, UserId } from 'src/app/core/interfaces';
import { ProductsService, ShoppingCartService } from 'src/app/core/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id?: string;
  quantity: number = 1;
  user!: UserId;

  // Variables para almacenar la información de las interfaces
  productData: Products = {} as Products;
  shoppingCart: ShoppingCart = {} as ShoppingCart;
  shoppihnCartResponse: ShoppingCartResponse = {} as ShoppingCartResponse;

  constructor(private prodService: ProductsService, private cartService: ShoppingCartService, 
    private activateRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id')!;
    await this.prodService.getProductById(Number(this.id)).subscribe({
      next: (res: any) => {
        this.productData = res;
      }
    });

    this.user = JSON.parse(localStorage.getItem('user')!);
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

  // Agregar al carrito
  addShoppingCart() {
    this.shoppingCart.userId = this.user.id;
    this.shoppingCart.amount = this.quantity;
    this.shoppingCart.productId = Number(this.id);
    this.cartService.postShoppingCart(this.shoppingCart).subscribe({
      next: (res: any) => {
        this.shoppihnCartResponse = res;
        console.log(this.shoppihnCartResponse);
      }
    });
  }
}
