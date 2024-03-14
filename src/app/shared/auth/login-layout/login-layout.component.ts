import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {
  @Input()
  parentLoginForm!: FormGroup;
  loginData: Login = {} as Login;

  constructor(private user: UsersService, private lsService: LocalStorageService,
    private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void { }

  showRegister() {
    this.router.navigate(['/auth/register']);	
  }


  loginSubmit() {
    if (this.parentLoginForm.valid) {
      this.loginData = this.parentLoginForm.value;
      this.user.login(this.loginData).subscribe({
        next: (res: any) => {
          this.lsService.setToken(res.jwTtoken);
        },
        complete: () => {
          this.parentLoginForm.reset();
          this.user.getCurrentUser().subscribe(
            (user: any) => {
              this.lsService.setUser(user);
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });

            }
          )
        },
        error: (err: any) => {
          this.snack.open(err.error.message, 'Cerrar', {
            duration: 2000
          });
        }
      }
      );
    }
  }

  getErrorMessageEmail() {
    if (this.parentLoginForm.get('username')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.parentLoginForm.get('username')!.hasError('email') ? 'Formato de correo invalido' : '';
  }

  getErrorMessagePassword() {
    if (this.parentLoginForm.get('password')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.parentLoginForm.get('password')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }
}
