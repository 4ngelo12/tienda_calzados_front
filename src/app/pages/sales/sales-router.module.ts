import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesUserComponent } from './sales-user';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SalesUserComponent },
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
export class SalesRouterModule { }
