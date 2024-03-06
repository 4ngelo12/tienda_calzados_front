import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/users/login/login.component';
import { RegisterComponent } from './pages/users/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { WithoutSaveGuard } from './core/guards';
import { NotfoundComponent } from './shared/notfound';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'login', canDeactivate: [WithoutSaveGuard], component: LoginComponent, pathMatch: 'full'
  },
  {
    path: 'register', canDeactivate: [WithoutSaveGuard], component: RegisterComponent, pathMatch: 'full'
  },
  {
    path: '**', component: NotfoundComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
