import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './users/login-layout';
import { MaterialModule } from '../modules/material/material.module';
import { AppRouterModule } from '../app-router.module';
import { RegisterLayoutComponent } from './users/register-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginLayoutComponent,
    RegisterLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginLayoutComponent,
    RegisterLayoutComponent
  ]
})
export class CompartidoModule { }
