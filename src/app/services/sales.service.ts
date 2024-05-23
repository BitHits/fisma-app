import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import raw from '../data/data.json';
import { Column, TableConfiguration, Header, DataColumn } from '../interfaces/data.interface';

@Injectable({ providedIn: 'root' })
export class SalesService {

    totalFieldName = 'total';

    private tableConfiguration: BehaviorSubject<TableConfiguration> = new BehaviorSubject<TableConfiguration>({ sortedColumns: [], firstRowHeaders: [], secondRowHeaders: [] });
    public TableConfiguration: Observable<TableConfiguration> = this.tableConfiguration.asObservable();

    private rowsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public RowsData: Observable<any[]> = this.rowsData.asObservable();

    constructor() {
        // get the column definitions from the raw data
        this.SetColumnDefinitions(raw.column);
        this.setRowData(raw.data);
    }

    public setRowData(rows: any) {
        // process the rows according to the column definitions
        // type: any, because the schema of the data is unknown/dynamic
        let tabledata: any[] = [];
        rows.forEach((row: any) => {
            let tablerow: any = {};
            let sum = 0;
            this.tableConfiguration.value.sortedColumns.forEach((col: any) => {
                tablerow[col.field] = row[col.field];
                if (col['sum'] === true) {
                    sum += row[col.field] ?? 0;
                }
            });
            tablerow[this.totalFieldName] = sum;
            tabledata.push(tablerow);
        });
        this.rowsData.next(tabledata);
    }

    public SetColumnDefinitions(column: DataColumn[]) {
        // 1 level of subheaders
        let currentColumnPosition = 0;
        let firstRowHeaders: Header[] = [];
        let secondRowHeaders: Header[] = [];
        let sortedColumns: Column[] = [];

        column.forEach((column: DataColumn) => {
            currentColumnPosition++;
            if (column.field) {
                firstRowHeaders.push({ header: column.header, align: "start", sortField: column.field, rowspan: 2, colspan: 1 });
                sortedColumns.push({ field: column.field, sum: column.sum, currency: column.currency });
            } else if (column.subHeaders) {
                firstRowHeaders.push({ header: column.header, align: "center", sortField: this.totalFieldName, rowspan: 1, colspan: currentColumnPosition + 1 });
                column.subHeaders.forEach((subColumn: DataColumn) => {
                    secondRowHeaders.push({ header: subColumn.header, sortField: subColumn.field, rowspan: 1, colspan: 1 });
                    sortedColumns.push({ field: subColumn.field, currency: subColumn.currency, sum: subColumn.sum });
                });
            } else {
                firstRowHeaders.push({ header: column.header, align: "start", sortField: this.totalFieldName, rowspan: 2, colspan: 1 });
                sortedColumns.push({ field: this.totalFieldName, sum: column.sum, currency: column.currency });
            }
        });

        this.tableConfiguration.next({
            sortedColumns,
            firstRowHeaders,
            secondRowHeaders
        });
    }

    // param type any; as the schema is unknown/dynamic
    public AddNewProduct(product: any) {
        this.rowsData.next([...this.rowsData.value, { ...product }]);
    }


}