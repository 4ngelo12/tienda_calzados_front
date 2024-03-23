import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService, Login, UsersService } from 'src/app/core';
import { CanExit } from 'src/app/core/guards';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, CanExit {
  Loginform!: FormGroup;
  loginData: Login = {} as Login;
  hide = true;

  constructor(private user: UsersService, private auth: AuthService, private lsService: LocalStorageService,
    private router: Router, private snack: MatSnackBar, private fb: FormBuilder) { }

  onExit() {
    if (this.Loginform.dirty) {
      return confirm('¿Estás seguro de abandonar el formulario? Se perderán los cambios no guardados.');
    }
    return true;
  }

  ngOnInit(): void {
    this.Loginform = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  // Login
  loginSubmit() {
    if (this.Loginform.valid) {
      this.loginData = this.Loginform.value;
      this.auth.login(this.loginData).subscribe({
        next: (res: any) => {
          this.lsService.setToken(res.jwTtoken);
        },
        complete: () => {
          this.Loginform.reset();
          this.user.getCurrentUser().subscribe(
            (user: any) => {
              this.lsService.setUser(user);
              this.router.navigate(['/home'])
            }
          )
        },
        error: (err: any) => {
          this.snack.open(err.error.message ? err.error.message : "Hubo un error al autenticar su cuenta", 'Cerrar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-red-600', 'text-white', 'custom-close-button-text', 'dark:bg-red-800'],
          });
        }
      }
      );
    }
  }

   // Redirecciones
   showRegister() {
    this.router.navigate(['/auth/register']);
  }

  showRecoveryPassword() {
    this.router.navigate(['/auth/recovery-password']);
  }

   // Validaciones de formulario

   getErrorMessageEmail() {
    if (this.Loginform.get('username')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.Loginform.get('username')!.hasError('email') ? 'Formato de correo invalido' : '';
  }

  getErrorMessagePassword() {
    if (this.Loginform.get('password')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.Loginform.get('password')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }

}
