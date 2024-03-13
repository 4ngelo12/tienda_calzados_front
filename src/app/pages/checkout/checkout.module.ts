import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { CheckoutRouterModule } from './checkout-router.module';
import { MaterialModule } from 'src/app/modules/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService, SaleService, ShoppingCartService } from 'src/app/core/services';



@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    CheckoutRouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CardsComponent
  ],
  providers: [
    LocalStorageService,
    ShoppingCartService,
    SaleService
  ]
})
export class CheckoutModule { }
