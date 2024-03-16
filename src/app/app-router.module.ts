import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { UserGuard } from './core/guards';
import { NotfoundComponent } from './shared/notfound';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages').then(m => m.AuthModule)
  },
  {
    path: 'checkout', canActivate: [UserGuard],
    loadChildren: () => import('./pages').then(m => m.CheckoutModule)
  },
  {
    path: 'products', canActivate: [UserGuard],
    loadChildren: () => import('./pages').then(m => m.ProductsModule)
  },
  {
    path: 'sales', canActivate: [UserGuard],
    loadChildren: () => import('./pages').then(m => m.SalesModule)
  },
  {
    path: 'users', canActivate: [UserGuard],
    loadChildren: () => import('./pages').then(m => m.UsersModule)
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
