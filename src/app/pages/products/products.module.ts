import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductsService } from 'src/app/core/services';
import { ProductsRouterModule } from './products-router.module';
import { MaterialModule } from 'src/app/modules/material';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsRouterModule
  ],
  exports: [
    ProductComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
