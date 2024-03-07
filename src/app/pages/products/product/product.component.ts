import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/core/interfaces';
import { ProductsService } from 'src/app/core/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id?: string;
  productData: Products = {} as Products;

  constructor(private prodService: ProductsService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get('id')!;
    this.prodService.getProductById(Number(this.id)).subscribe(
      (res: any) => {
        this.productData = res;
      }
    )
  }

  get product() {
    return this.prodService.getProductById(Number(this.id));
  }
}
