import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesUserComponent } from './sales-user';
import { SalesRouterModule } from './sales-router.module';
import { LocalStorageService, SaleService } from 'src/app/core';
import { MaterialModule } from 'src/app/modules';



@NgModule({
  declarations: [
    SalesUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SalesRouterModule
  ],
  exports: [
    SalesUserComponent,
  ],
  providers: [
    SaleService,
    LocalStorageService
  ]
})
export class SalesModule { }
