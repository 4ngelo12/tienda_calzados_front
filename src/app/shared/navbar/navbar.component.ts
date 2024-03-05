import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ocultarNavbar() {
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.add('hidden');
    }
  }

  mostrarNavbar() {
    const navbar = document.querySelector('#navbar');
    if (navbar) {
      navbar.classList.remove('hidden');
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaActual = this.router.url;
        console.log(rutaActual);
        (rutaActual !== '/login' && rutaActual !== '/register') ? this.mostrarNavbar() : this.ocultarNavbar();
      }
    });
  }


}
