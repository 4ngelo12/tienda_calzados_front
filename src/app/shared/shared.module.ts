import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material';
import { AppRouterModule } from '../app-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar';
import { LoginLayoutComponent, RegisterLayoutComponent } from './users';
import { NotfoundComponent } from './notfound';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    LoginLayoutComponent,
    RegisterLayoutComponent,
    NavbarComponent,
    NotfoundComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    LoginLayoutComponent,
    RegisterLayoutComponent,
    NotfoundComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
