import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: any;
  navbar!: ElementRef;

  constructor(private router: Router, private ls: LocalStorageService, private renderer: Renderer2, private el: ElementRef,
    private cdr: ChangeDetectorRef) {
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

  tokenAvailable() {
    this.token = this.ls.getToken();
  }

  rechargeComponent() {
    this.token = ""
    this.tokenAvailable();

    this.cdr.detectChanges();
  }


}