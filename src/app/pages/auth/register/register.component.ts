import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UsersService } from 'src/app/core';
import { CanExit } from 'src/app/core/guards';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanExit {
  registerForm!: FormGroup;
  RegisterData: User = {} as User;
  hidePass = true;
  hidePassConfirm = true;

  constructor(private user: UsersService, private router: Router, private snack: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onExit() {
    if (this.registerForm.dirty) {
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

  // Ejecucion de la funcion registerSubmit
  registerSubmit() {
    if (this.registerForm.valid) {
      this.RegisterData = this.registerForm.value;
      this.RegisterData.idRole = 2;

      if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
        this.snack.open('Las contraseñas no coinciden', 'Aceptar', {
          duration: 5000
        });
        return;
      }
      if (this.registerForm.value.birthdate < '1/1/2005') {
        this.snack.open('Debes ser mayor de 18 años para registrarte', 'Aceptar', {
          duration: 5000
        });
        return;
      }

      this.user.register(this.RegisterData).subscribe({
        next: (res: any) => {
          this.snack.open('Usuario registrado', 'Aceptar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-green-600', 'text-white', 'custom-close-button-text', 'dark:bg-green-800'],
          });

          this.registerForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.snack.open('Error al registrar User', 'Aceptar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-red-600', 'text-white', 'custom-close-button-text', 'dark:bg-red-800'],
          });
        },
        complete: () => {
          this.router.navigate(['/auth/login']);
        }
      })
    }
  }

   // Redirecciones
   showLogin() {
    this.router.navigate(['auth/login']);
  }

  // Validaciones de formulario

  getErrorMessageName() {
    if (this.registerForm.get('name')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.registerForm.get('name')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.registerForm.get('name')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getErrorMessageLastName() {
    if (this.registerForm.get('lastname')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.registerForm.get('lastname')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.registerForm.get('lastname')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getErrorMessageEmail() {
    if (this.registerForm.get('email')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.registerForm.get('email')!.hasError('email') ? 'Formato de correo invalido' : '';
  }

  getErrorMessageBirthDate() {
    return this.registerForm.get('birthdate')!.hasError('required') ? 'Debes ingresar un valor' : '';
  }

  getErrorMessagePassword() {
    if (this.registerForm.get('password')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.registerForm.get('password')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }

  getErrorMessagePasswordConfirm() {
    if (this.registerForm.get('passwordConfirm')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.registerForm.get('passwordConfirm')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }
}
