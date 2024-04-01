import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/core/interfaces';
import { LocalStorageService, ProductsService } from 'src/app/core/services';
import baseUrl from 'src/app/core/services/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public page: number = 0;
  itemsPerPage: number = 8;
  ProductData: Products[] = [];
  search: string = '';
  imgURL: string = `${baseUrl}/media`;

  constructor(private prodService: ProductsService, private lsService: LocalStorageService, private route: Router) { }


  async ngOnInit() {
    this.lsService.validateToken();
    await this.getProducts();
  }

  getProducts() {
    this.prodService.getProducts().subscribe({
      next: (res: any) => {
        this.ProductData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showProduct(id: number) {
    this.route.navigate(['/products', id]);
  }

  // Controles para la paginación
  nextPage() {
    this.page += this.itemsPerPage;
  }

  prevPage() {
    if (this.page > 0) {
      this.page -= this.itemsPerPage;
    }
  }

  // Metodo para filtrar productos
  onSearchProduct(search: string) {
    this.page = 0;
    this.search = search;
  }
}
