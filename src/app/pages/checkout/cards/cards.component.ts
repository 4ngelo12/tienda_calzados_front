import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sale, ShoppingCartByUserId } from 'src/app/core/interfaces';
import { LocalStorageService, SaleService, ShoppingCartService } from 'src/app/core/services';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
  },
};

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CardsComponent implements OnInit {

  data: ShoppingCartByUserId[] = [];
  checkoutForm!: FormGroup;
  saleData: Sale = {} as Sale;
  totalValue!: number;
  token: string = "";
  userId!: number;

  constructor(private saleService: SaleService, private cartService: ShoppingCartService, private lsService: LocalStorageService,
    private fb: FormBuilder, public route: Router, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      cardNumber: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19),
      Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)]],
      expiration: ['', [Validators.required]],
      ccv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });

    this.token = this.lsService.getToken() ?? '';
    this.getShoppingCartValues();
  }

  getShoppingCartValues() {
    if (this.token) {
      this.userId = this.lsService.getUser().id;

      this.cartService.getShoppingCartByUserId(this.userId).subscribe({
        next: (res: any) => {
          this.data = res;
        }
      });
    }
  }

  getTotaPrice() {
    return this.data.reduce((acc, item) => acc + item.subTotal, 0);
  }

  submitSale() {
    if (this.checkoutForm.valid) {
      this.totalValue = this.getTotaPrice();
      this.saleData.userId = this.lsService.getUser().id;
      this.saleData.total = this.totalValue;
      const currentDate = new Date();
      this.saleData.purchase_date = new Date(
        currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

      this.saleService.postSale(this.saleData).subscribe({
        next: (res: any) => {
          this.snack.open('Pago exitoso', 'Cerrar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-green-600', 'text-white', 'custom-close-button-text', 'dark:bg-green-800'],
          });
          this.cartService.deleteShoppingCartByUserId(res.userId).subscribe({
            next: () => {
              this.route.navigate(['/']);
            }
          });
        },
        error: (err: any) => {
          this.snack.open('Error al procesar el pago', 'Cerrar', {
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: ['bg-red-600', 'text-white', 'custom-close-button-text', 'dark:bg-red-800'],
          });
        }
      });
    }
  }

  // Inputs configuration
  truncateValue(event: any) {
    const inputValue = event.target.value;
    if (inputValue.length > 3) {
      event.target.value = inputValue.slice(0, 3);
    }
  }

  formatCardNumber(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  setMonthAndYear(normalizedMonthAndYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.checkoutForm.get('expiration')?.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.checkoutForm.get('expiration')?.setValue(ctrlValue);
    datepicker.close();
  }

  // Form Validation
  getNameErrorMessage() {
    if (this.checkoutForm.get('name')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.checkoutForm.get('name')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.checkoutForm.get('name')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getEmailErrorMessage() {
    if (this.checkoutForm.get('email')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.checkoutForm.get('email')!.hasError('email') ? 'Formato de correo invalido' : '';
  }

  getCardNumberErrorMessage() {
    if (this.checkoutForm.get('cardNumber')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.checkoutForm.get('cardNumber')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }
    if (this.checkoutForm.get('cardNumber')!.hasError('pattern')) {
      return 'El valor ingresado no es válido';
    }

    return this.checkoutForm.get('cardNumber')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }

  getExpirationErrorMessage() {
    return this.checkoutForm.get('expiration')!.hasError('required') ? 'Debes ingresar un valor' : '';
  }

  getCCVErrorMessage() {
    if (this.checkoutForm.get('ccv')!.hasError('required')) {
      return 'Debes ingresar un valor';
    }
    if (this.checkoutForm.get('ccv')!.hasError('maxlength')) {
      return 'El valor ingresado es demasiado largo';
    }

    return this.checkoutForm.get('ccv')!.hasError('minlength') ?
      'El valor ingresado no es lo suficientemente largo' : '';
  }
}
