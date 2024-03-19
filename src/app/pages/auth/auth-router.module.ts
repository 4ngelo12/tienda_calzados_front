import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { WithoutSaveGuard } from 'src/app/core/guards';
import { RecoveryPasswordComponent } from './recovery-password';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', canDeactivate: [WithoutSaveGuard], component: LoginComponent },
      { path: 'register', canDeactivate: [WithoutSaveGuard], component: RegisterComponent },
      { path: 'change-password/:id', canDeactivate: [WithoutSaveGuard], component: ChangePasswordComponent},
      { path: 'recovery-password', canDeactivate: [WithoutSaveGuard], component: RecoveryPasswordComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRouterModule { }
