import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService, UsersService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: any;
  navbar!: ElementRef;

  constructor(private router: Router, private user: UsersService, private ls: LocalStorageService, private renderer: Renderer2,
    private el: ElementRef, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.navbar = this.el.nativeElement.querySelector('#navbar');
    this.tokenAvailable();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaActual = this.router.url;
        (rutaActual !== '/login' && rutaActual !== '/register') ? this.showNavbar() : this.hiddenNavbar();
      }
    });
  }

  logout() {
    this.user.logout();
    this.rechargeComponent();
  }

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

  tokenAvailable() {
    this.token = this.ls.getToken();
  }

  rechargeComponent() {
    this.token = ""
    this.tokenAvailable();

    this.cdr.detectChanges();
  }

  onclick() {
    setTimeout(() => {
      document.querySelector('#shopping-cart')?.classList.toggle('hidden');
    }, 500);
    document.querySelector('#shopping-cart-list')?.classList.remove('transform', 'transition', 'ease-in-out', 'duration-500',
      'sm:duration-700', 'translate-x-full');
    document.querySelector('#shopping-cart-bg')?.classList.remove('ease-in-out', 'duration-500', 'opacity-0');
  }
}