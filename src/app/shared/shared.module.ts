import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar';
import { NotfoundComponent } from './notfound';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart';



@NgModule({
  declarations: [
    NavbarComponent,
    NotfoundComponent,
    FooterComponent,
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    NotfoundComponent,
    FooterComponent,
    ShoppingCartComponent,
  ],
})
export class SharedModule { }
