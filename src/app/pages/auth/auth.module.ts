import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRouterModule } from './auth-router.module';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { LocalStorageService, UsersService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRouterModule,
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    UsersService,
    LocalStorageService
  ]
})
export class AuthModule { }
