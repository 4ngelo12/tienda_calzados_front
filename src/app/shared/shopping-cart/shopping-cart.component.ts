import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ShoppingCartByUserId } from 'src/app/core/interfaces';
import { LocalStorageService, ShoppingCartService } from 'src/app/core/services';
import baseUrl from 'src/app/core/services/helper';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input()
  token!: string;

  data: ShoppingCartByUserId[] = [];
  userId!: number;
  imgURL: string = `${baseUrl}/media`;

  constructor(private cartService: ShoppingCartService, private lsService: LocalStorageService, private route: Router) { }

  ngOnInit(): void {
  }

  getShoppingCartValues() {
    if (this.token) {
      this.userId = this.lsService.getUser().id;

      this.cartService.getShoppingCartByUserId(this.userId).subscribe({
        next: (res: any) => {
          this.data = res;
        }
      });
    }
  }

  closeComponent() {
    document.querySelector('#shopping-cart-list')?.classList.add('transform', 'transition', 'ease-in-out', 'duration-500',
      'sm:duration-700', 'translate-x-full');
    document.querySelector('#shopping-cart-bg')?.classList.add('ease-in-out', 'duration-500', 'opacity-0');
    setTimeout(() => {
      document.querySelector('#shopping-cart')?.classList.toggle('hidden');
    }, 500);
  }

  RemoveFromShoppingCart(id: number) {
    this.cartService.deleteShoppingCart(id).subscribe({
      next: () => {
        this.data = this.data.filter((item) => item.id !== id);
      }
    });
  }

  getTotaPrice() {
    return this.data.reduce((acc, item) => acc + item.subTotal, 0);
  }

  showProduct(id: number) {
    this.route.navigate(['/products', id]);
  }

  showCheckout(totalValue: number) {
    this.closeComponent();
    let navigationExtras: NavigationExtras = {
      state: {
        totalValue: totalValue
      }
    };
    this.route.navigate(['/checkout'], navigationExtras);
  }
}
