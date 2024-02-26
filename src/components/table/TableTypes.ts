/**
 * 通用欄位排序
 * @param asc - 由小到大
 * @param desc - 由大到小
 */
export type Order = 'asc' | 'desc';

/**
 * 通用欄位
 * @param id - 欄位的 ID 必須要與除入的欄位型別相符 
 */
export interface HeadCell<T> {
    disablePadding: boolean
    id: keyof T
    label: string
    numeric: boolean
}

export type TableHeads<T> = {
    columnId: any
    columnType: 'num' | 'str'
    columnName: T
    columnLabel: any
    disablePadding?: boolean,
    render?: (columnValue: any) => JSX.Element
}[]

export type TableBodys<T extends string | number | symbol> = {
    [P in T]: any
}[]

export interface SortProps<T extends string | number | symbol> {
    sortColumn: (property: T) => void
    sortBy: T
    orderBy: 'asc' | 'desc'
}

export interface EnhancedTableProps<T extends string | number | symbol> {
    head: TableHeads<T>
    body: TableBodys<T>
    rowsPerPageData: number[]
    sort?: SortProps<T>
}

