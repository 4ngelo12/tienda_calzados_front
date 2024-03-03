import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { CompartidoModule } from 'src/app/compartido/compartido.module';
import { LocalStorageService, UsersService } from 'src/app/core/services';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    CompartidoModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    UsersService,
    LocalStorageService
  ]
})
export class UsersModule { }
