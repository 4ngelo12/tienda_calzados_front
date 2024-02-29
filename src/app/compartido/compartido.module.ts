import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../modules/material/material.module';
import { LoginLayoutComponent } from './users/login-layout/login-layout.component';
import { RegisterLayoutComponent } from './users/register-layout/register-layout.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LoginLayoutComponent,
    RegisterLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    LoginLayoutComponent,
    RegisterLayoutComponent
  ]
})
export class CompartidoModule { }
