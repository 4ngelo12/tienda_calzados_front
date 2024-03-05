import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { LocalStorageService, UsersService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
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
