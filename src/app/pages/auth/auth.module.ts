import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRouterModule } from './auth-router.module';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { LocalStorageService, UsersService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';
import { MaterialModule } from 'src/app/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password';
import { RecoveryPasswordComponent } from './recovery-password';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRouterModule,
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    RecoveryPasswordComponent
  ],
  providers: [
    UsersService,
    LocalStorageService
  ]
})
export class AuthModule { }
