import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.footer = this.el.nativeElement.querySelector('#footer');
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaActual = this.router.url;
        (rutaActual !== '/login' && rutaActual !== '/register') ? this.showFooter() : this.hiddenFooter();
      }
    });
  }

  hiddenFooter() {
    if (this.footer) {
      this.renderer.addClass(this.footer, 'hidden');
    }
  }

  showFooter() {
    if (this.footer) {
      this.renderer.removeClass(this.footer, 'hidden');
    }
  }

}
