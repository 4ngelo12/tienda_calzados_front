import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRouterModule } from 'src/app/app-router.module';
import { HomeComponent } from './home.component';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRouterModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
