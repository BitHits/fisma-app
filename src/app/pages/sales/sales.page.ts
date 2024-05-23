import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';

@Component({
    selector: 'eu-sales',
    templateUrl: 'sales.page.html',
    styleUrls: ['sales.page.scss']
})

export class SalesComponent implements OnInit {


    definitions: any = [];
    rows: any = [];
    searchColumns: any[] = [];

    constructor(public salesService: SalesService) {

    }

    updateSumOnEnter(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.salesService.setRowData(this.rows);
        }
    }

    updateSumOnMouse() {
        this.salesService.setRowData(this.rows);
    }

    ngOnInit() {
        this.salesService.TableConfiguration.subscribe((definitions: any) => {
            this.definitions = definitions;
            this.searchColumns = this.definitions.sortedColumns.map((c: any) => c.field);
        });
        this.salesService.RowsData.subscribe((data: any) => {
            this.rows = data
        });
    }
}