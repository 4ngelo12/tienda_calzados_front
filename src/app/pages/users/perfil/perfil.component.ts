import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UpdateUser, UserLs } from 'src/app/core/interfaces';
import { LocalStorageService, UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  updateForm !: FormGroup;
  userId!: number;

  // User data
  userUpdData: UpdateUser = {} as UpdateUser;
  userData: UserLs = {} as UserLs;

  constructor(private userService: UsersService, private lsService: LocalStorageService, private router: Router,
    private fb: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.userData = this.lsService.getUser();

    this.updateForm = this.fb.group({
      name: [this.userData.name, [Validators.minLength(3), Validators.maxLength(45)]],
      lastname: [this.userData.lastName, [Validators.minLength(3), Validators.maxLength(45)]],
      email: [this.userData.email, [Validators.email]],
      birthdate: [this.userData.birthdate, []],
    });
  }

  deleteUser() {
    this.userId = this.lsService.getUser().id;
    this.userService.deleteUser(this.userId).subscribe({
      next: () => {
        this.lsService.deleteToken();
        this.lsService.deleteUser();
        this.router.navigate(['/']);
      }
    });
  }

  updateUser() {
    if (this.updateForm.valid) {
      this.userUpdData = this.updateForm.value;
      this.userUpdData.id = this.lsService.getUser().id;
      this.userService.updateUser(this.userUpdData).subscribe({
        next: () => {
          this.snack.open('Datos Actualizados', 'Cerrar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-green-600', 'text-white', 'custom-close-button-text', 'dark:bg-green-800'],
          });
        },
        complete: () => {
          this.lsService.deleteUser();
          this.lsService.setUser(this.userUpdData);
        }
      });
    }
  }

  // Forms errors messages
  getErrorMessageName() {
    if (this.updateForm.get('name')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.updateForm.get('name')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getErrorMessageLastName() {
    if (this.updateForm.get('lastname')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.updateForm.get('lastname')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getErrorMessageEmail() {
    return this.updateForm.get('email')!.hasError('email') ? 'Formato de correo invalido' : '';
  }
}
