import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanExit } from 'src/app/core/guards';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanExit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onExit() {
    if (this.form.dirty) {
      return confirm('¿Estás seguro de abandonar el formulario? Se perderán los cambios no guardados.');
    }
    return true;
  }

}
