import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRouterModule } from 'src/app/app-router.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRouterModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
