import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CanExit, LocalStorageService, RecoveryPassword, UsersService } from 'src/app/core';
import baseUrl from 'src/app/core/services/helper';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit, CanExit {
  recoveryPasswordForm!: FormGroup;
  recoveryPasswordData: RecoveryPassword = {} as RecoveryPassword;
  userId!: number;

  constructor(private userService: UsersService, private router: Router, private fb: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.recoveryPasswordForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }

  onExit() {
    if (this.recoveryPasswordForm.dirty) {
      return confirm('¿Estás seguro de abandonar el formulario? Se perderán los cambios no guardados.');
    }

    return true;
  }

  // Redireccionar a la pagina de login
  showLogin() {
    this.router.navigate(['/auth/login']);
  }

  // Enviar correo de recuperacion de contraseña
  sendEmail() {
    if (this.recoveryPasswordForm.valid) {
      this.userService.getUserByEmail(this.recoveryPasswordForm.get('username')!.value).subscribe({
        next: (data: any) => {
          this.userId = data.id;
          this.recoveryPasswordData.to = this.recoveryPasswordForm.get('username')!.value;
          this.recoveryPasswordData.subject = 'Recuperación de contraseña';
          this.recoveryPasswordData.template = 1;
          this.recoveryPasswordData.metaData = [
            {
              "key": "name",
              "value": "Angelo"
            },
            {
              "key": "lastname",
              "value": "Casapaico"
            },
            {
              "key": "email",
              "value": this.recoveryPasswordForm.get('username')!.value
            },
            {
              "key": "url",
              "value": `http://localhost:4200/auth/change-password/${this.userId}`
            }
          ];

          this.userService.sendEmail(this.recoveryPasswordData).subscribe({
            next: (data: any) => {
              this.snack.open(data.mensaje, 'Cerrar', {
                horizontalPosition: 'end',
                duration: 5000,
                panelClass: ['bg-green-600', 'text-white', 'custom-close-button-text', 'dark:bg-green-800'],
              });
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              this.recoveryPasswordForm.reset();
              this.router.navigate(['/auth/login']);
            }
          })
        },
        error: (error) => {
          console.log(error);
        },
      });

    }
  }

  // Form Validation
  getErrorMessageEmail() {
    if (this.recoveryPasswordForm.get('username')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.recoveryPasswordForm.get('username')!.hasError('email') ? 'Formato de correo invalido' : '';
  }
}
