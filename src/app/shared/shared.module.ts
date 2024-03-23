import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar';
import { NotfoundComponent } from './notfound';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart';
import { UnauthorizedComponent } from './unauthorized';



@NgModule({
  declarations: [
    NavbarComponent,
    NotfoundComponent,
    FooterComponent,
    ShoppingCartComponent,
    UnauthorizedComponent,
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
    UnauthorizedComponent,
  ],
})
export class SharedModule { }
