import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService, UsersService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersRouterModule } from './users-router.module';
import { MaterialModule } from 'src/app/modules/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ExternalModule } from 'src/app/modules';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExternalModule,
    MaterialModule,
    ReactiveFormsModule,
    UsersRouterModule
  ],
  exports: [
  ],
  providers: [
    UsersService,
    LocalStorageService
  ]
})
export class UsersModule { }
