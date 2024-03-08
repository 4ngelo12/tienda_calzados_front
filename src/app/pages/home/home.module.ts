import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRouterModule } from 'src/app/app-router.module';
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
    AppRouterModule,
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
