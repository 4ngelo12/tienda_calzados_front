import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CardsComponent },
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
export class CheckoutRouterModule { }
