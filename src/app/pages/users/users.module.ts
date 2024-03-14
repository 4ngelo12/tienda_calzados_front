import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService, UsersService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    UsersService,
    LocalStorageService
  ]
})
export class UsersModule { }
