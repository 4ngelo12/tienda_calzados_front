import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/core/interfaces';
import { ProductsFilterPipe } from 'src/app/core/pipes';
import { ProductsService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public page: number = 0;
  itemsPerPage: number = 4;
  ProductData: Products[] = [];
  search: string = '';

  constructor(private prodService: ProductsService, private route: Router) { }


  ngOnInit(): void {
    this.getProducts();
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
    console.log(id);
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
