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

type TableUnionType = string | number;

export type TableHeads<T> = {
    columnId: any
    columnType: 'num' | 'str' | 'any'
    columnName: T
    columnLabel: any
    disablePadding?: boolean,
    render?: (columnValue: any) => JSX.Element
}[]

export type TableBodys<T extends TableUnionType> = ({
    [P in T]: any
} & { children?: TableBodys<TableUnionType> })[]

export interface SortProps<T extends TableUnionType> {
    sortColumn: (property: T) => void
    sortBy: T
    orderBy: 'asc' | 'desc'
}

export interface EnhancedChildren<T extends TableUnionType> {
    childrenHeads: TableHeads<T>
    // childrenBodys: TableHeads<T>
}

/**
 * @param head 表頭
 * @param body 表身
 * @param rowsPerPageData 跳頁每一頁顯示多少筆 ex: [5, 10, 20]
 * @param sort 是否排序
 */
export interface EnhancedTableProps<T extends TableUnionType> {
    head: TableHeads<T>
    body: TableBodys<T>
    rowsPerPageData: number[]
    sort?: SortProps<T>
    childrenOptions?: EnhancedChildren<TableUnionType>
    // children?: TableBodys<T>
    // childrenOptions?: {
    //     childrenHead: TableHeads<TableUnionType>
    //     childrenBody: TableBodys<TableUnionType>
    // }
}

/**
 * @param head 要讓 body 所渲染的 欄位值
 * @param body 傳入的 row
 * @param children 要傳入的子欄位
 * @param children.childrenHeads 子欄位的 head
 */
export interface EnhancedRows<C extends TableUnionType> {
    head: TableHeads<C>
    body: TableBodys<C>[number]
    children: {
        // childrenName: string | number
        childrenHeads: TableHeads<TableUnionType>
    }
}