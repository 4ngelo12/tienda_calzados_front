import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFilterPipe } from './products-filter';


@NgModule({
  declarations: [
    ProductsFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsFilterPipe
  ]
})
export class PipesModule { }
