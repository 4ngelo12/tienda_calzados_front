import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-register-layout',
  templateUrl: './register-layout.component.html',
  styleUrls: ['./register-layout.component.css'],
})
export class RegisterLayoutComponent implements OnInit {
  @Input()
  parentRegisterForm!: FormGroup;
  RegisterData: Usuario = {} as Usuario;

  constructor(private user: UsersService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerSubmit() {
    if (this.parentRegisterForm.valid) {
      this.RegisterData = this.parentRegisterForm.value;
      this.RegisterData.idRole = 2;

      if (this.parentRegisterForm.value.password !== this.parentRegisterForm.value.passwordConfirm) {
        this.snack.open('Las contraseñas no coinciden', 'Aceptar', {
          duration: 5000
        });
        return;
      }
      if (this.parentRegisterForm.value.birthdate < '1/1/2005') {
        this.snack.open('Debes ser mayor de 18 años para registrarte', 'Aceptar', {
          duration: 5000
        });
        return;
      }
      
      this.user.register(this.RegisterData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.snack.open('Usuario registrado', 'Aceptar', {
            duration: 5000
          });

          this.parentRegisterForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.snack.open('Error al registrar usuario', 'Aceptar', {
            duration: 5000
          });
        },
        complete: () => {
          this.router.navigate(['/login']);
        }
      })
    }
  }


  getErrorMessageName() {
    if (this.parentRegisterForm.get('name')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.parentRegisterForm.get('name')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.parentRegisterForm.get('name')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getErrorMessageLastName() {
    if (this.parentRegisterForm.get('lastname')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.parentRegisterForm.get('lastname')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.parentRegisterForm.get('lastname')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getErrorMessageEmail() {
    if (this.parentRegisterForm.get('email')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.parentRegisterForm.get('email')!.hasError('email') ? 'Formato de correo invalido' : '';
  }

  getErrorMessageBirthDate() {
    return this.parentRegisterForm.get('birthdate')!.hasError('required') ? 'Debes ingresar un valor' : '';
  }

  getErrorMessagePassword() {
    if (this.parentRegisterForm.get('password')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.parentRegisterForm.get('password')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }

  getErrorMessagePasswordConfirm() {
    if (this.parentRegisterForm.get('passwordConfirm')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.parentRegisterForm.get('passwordConfirm')!.hasError('minlength') ? 'Longitud de contraseña insuficiente' : '';
  }

}
