import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { WithoutSaveGuard } from 'src/app/core/guards';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', canDeactivate: [WithoutSaveGuard], component: LoginComponent },
      { path: 'register', canDeactivate: [WithoutSaveGuard], component: RegisterComponent }
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
