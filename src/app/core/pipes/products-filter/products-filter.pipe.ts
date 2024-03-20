import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../../interfaces';

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {

  transform(value: Products[], page: number = 0, search: string = ''): Products[] {
    if (search.length > 0) {
      return value.filter(
        product => product.name.toLowerCase().includes(search.toLowerCase())
      ).slice(page, page + 8);
    }

    return value.slice(page, page + 8);
  }
}
