import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetSaleResponse, LocalStorageService, SaleDetails, SaleService } from 'src/app/core';

@Component({
  selector: 'app-sales-user',
  templateUrl: './sales-user.component.html',
  styleUrls: ['./sales-user.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SalesUserComponent implements OnInit {

  userId!: number
  columnNamesDisplay: string[] = ['code', 'purchase_date', 'total'];
  columnsToDisplayWithExpand = [...this.columnNamesDisplay, 'expand'];
  columnMapping: { [key: string]: string } = {
    'code': 'Código',
    'purchase_date': 'Fecha de Compra',
    'total': 'Total'
    // Puedes agregar más mapeos según sea necesario
  };
  dataSource!: MatTableDataSource<GetSaleResponse>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  showDetails: boolean = false;
  expandedElement!: GetSaleResponse | null;

  // Datos obtenidos de la API
  saleData: GetSaleResponse[] = [];
  detailData: SaleDetails[] = [];

  constructor(private lsService: LocalStorageService, private saleService: SaleService) { }

  ngOnInit(): void {
    this.userId = this.lsService.getUser().id;
    
    this.saleService.getSalesByUserId(this.userId)
      .subscribe((data: any) => {
        this.saleData = data.content;
        this.dataSource = new MatTableDataSource<GetSaleResponse>(this.saleData);
        this.dataSource.paginator = this.paginator;
      });
  }

  async getDetails(saleId: number) {
    this.showDetails = !this.showDetails;

    if (this.expandedElement != null) {
      await this.saleService.getSaleDetails(saleId)
        .subscribe((data: any) => {
          this.detailData = data;
        });
    }
  }

}
