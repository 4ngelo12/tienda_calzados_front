import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared';
import { LocalStorageService, ProductsService } from 'src/app/core/services';
import { MaterialModule } from 'src/app/modules/material';
import { PipesModule } from 'src/app/core/pipes';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    PipesModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    ProductsService,
    LocalStorageService
  ]
})
export class HomeModule { }
