import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService, UsersService } from 'src/app/core/services';
import { ShoppingCartComponent } from '../shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: any;
  navbar!: ElementRef;
  @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

  constructor(private router: Router, private user: UsersService, private ls: LocalStorageService, private renderer: Renderer2,
    private el: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.navbar = this.el.nativeElement.querySelector('#navbar');
    this.tokenAvailable();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaActual = this.router.url;
        (rutaActual.includes("/auth")) ? this.hiddenNavbar() : this.showNavbar();
      }
    });
  }

  // Redirecciones

  showHome() {
    this.router.navigate(['/home']);
  }

  showLogin() {
    this.router.navigate(['/auth/login']);
  }

  showPerfil() {
    this.router.navigate(['/users/perfil']);
  }

  logout() {
    this.user.logout();
    this.rechargeComponent();
    this.router.navigate(['/home']);
  }

  // Funciones de la barra de navegación

  hiddenNavbar() {
    if (this.navbar) {
      this.rechargeComponent();
      this.renderer.addClass(this.navbar, 'hidden');
    }
  }

  showNavbar() {
    if (this.navbar) {
      this.rechargeComponent();
      this.renderer.removeClass(this.navbar, 'hidden');
    }
  }

  showShoppingCart() {
    setTimeout(() => {
      document.querySelector('#shopping-cart')?.classList.toggle('hidden');
    }, 500);
    document.querySelector('#shopping-cart-list')?.classList.remove('transform', 'transition', 'ease-in-out', 'duration-500',
      'sm:duration-700', 'translate-x-full');
    document.querySelector('#shopping-cart-bg')?.classList.remove('ease-in-out', 'duration-500', 'opacity-0');
    this.shoppingCart.getShoppingCartValues();
  }

  tokenAvailable() {
    this.token = this.ls.getToken();
  }

  rechargeComponent() {
    this.token = ""
    this.tokenAvailable();

    this.cdr.detectChanges();
  }
}