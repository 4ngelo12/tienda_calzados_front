import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../modules/material/material.module';
import { LoginLayoutComponent } from './users/login-layout/login-layout.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LoginLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    LoginLayoutComponent
  ]
})
export class CompartidoModule { }
