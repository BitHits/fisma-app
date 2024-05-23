export interface Data {
    column: DataColumn[],
    data: any[]
}

export interface DataColumn {
    header: string,
    field?: string
    currency?: string,
    sum?: boolean,
    subHeaders?: DataColumn[]
}

export interface Column {
    field?: string
    currency?: string,
    sum?: boolean,
}

export interface Header {
    header: string,
    sortField: string | undefined,
    colspan: number
    rowspan: number,
    align?: string
}

export interface TableConfiguration {
    sortedColumns: Column[],
    firstRowHeaders: Header[],
    secondRowHeaders: Header[]
}