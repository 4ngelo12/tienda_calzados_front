import { Component, OnInit } from '@angular/core';
import { ShoppingCart, ShoppingCartByUserId } from 'src/app/core/interfaces';
import { LocalStorageService, ShoppingCartService } from 'src/app/core/services';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  data: ShoppingCartByUserId[] = [];
  userId!: number;

  constructor(private cartService: ShoppingCartService, private lsService: LocalStorageService) { }

  ngOnInit(): void {
    this.userId = this.lsService.getUser().id;

    this.cartService.getShoppingCartById(this.userId).subscribe({
      next: (res: any) => {
        this.data = res;
      }
    })
  }

  onclick() {
    document.querySelector('#shopping-cart-list')?.classList.add('transform', 'transition', 'ease-in-out', 'duration-500',
      'sm:duration-700', 'translate-x-full');
    document.querySelector('#shopping-cart-bg')?.classList.add('ease-in-out', 'duration-500', 'opacity-0');
    setTimeout(() => {
      document.querySelector('#shopping-cart')?.classList.toggle('hidden');
    }, 500);
  }

}
