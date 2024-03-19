import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CanExit, ResetPassword, UsersService } from 'src/app/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, CanExit {
  hidePass = true;
  hidePassConfirm = true;
  changePasswordForm!: FormGroup;
  id?: string;

  changePassData: ResetPassword = {} as ResetPassword;

  constructor(private userSerice: UsersService, private router: Router, private activateRoute: ActivatedRoute,
    private snack: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id')!;
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onExit() {
    if (this.changePasswordForm.dirty) {
      return confirm('¿Estás seguro de abandonar el formulario? Se perderán los cambios no guardados.');
    }
    return true;
  }

  togglePasswordVisibility() {
    this.hidePass = !this.hidePass;
  }

  togglePasswordVisibilityConfirm() {
    this.hidePassConfirm = !this.hidePassConfirm;
  }

  updatePassword() {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.value.password !== this.changePasswordForm.value.passwordConfirm) {
        this.snack.open('Las contraseñas no coinciden', 'Aceptar', {
          horizontalPosition: 'end',
          duration: 5000,
          panelClass: ['bg-red-600', 'text-white', 'custom-close-button-text', 'dark:bg-red-800'],
        });
        return;
      }

      this.changePassData = {
        id: Number(this.id),
        password: this.changePasswordForm.value.password
      };

      this.userSerice.updatePassword(this.changePassData).subscribe({
        next: (res: any) => {
          this.snack.open(res.message, 'Aceptar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-green-600', 'text-white', 'custom-close-button-text', 'dark:bg-green-800'],
          });
          this.changePasswordForm.reset();
          this.router.navigate(['/auth/login']);
        },
        error: (err: any) => {
          this.snack.open(err.message, 'Aceptar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-red-600', 'text-white', 'custom-close-button-text', 'dark:bg-red-800'],
          });
        }
      });
    }
  }

  // Validate Form
  getErrorMessagePassword() {
    if (this.changePasswordForm.get('password')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.changePasswordForm.get('password')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }

  getErrorMessagePasswordConfirm() {
    if (this.changePasswordForm.get('passwordConfirm')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.changePasswordForm.get('passwordConfirm')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }

}
