import React, { useCallback, useEffect, useState } from 'react'
import { Order, TableBodys, TableHeads } from '../../../../components/table/TableTypes';
import { Box, Paper } from '@mui/material'
import { Item } from '../../interfaces';
import axios, { AxiosResponse } from 'axios';
import EnhancedTable from '../../../../components/table/EnhancedTable';

// const headCells: HeadCell<Data>[] = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Dessert (100g serving)',
//   },
//   {
//     id: 'calories',
//     numeric: true,
//     disablePadding: false,
//     label: 'Calories',
//   },
//   {
//     id: 'fat',
//     numeric: true,
//     disablePadding: false,
//     label: 'Fat (g)',
//   },
//   {
//     id: 'carbs',
//     numeric: true,
//     disablePadding: false,
//     label: 'Carbs (g)',
//   },
//   {
//     id: 'protein',
//     numeric: true,
//     disablePadding: false,
//     label: 'Protein (g)',
//   },
// ]

// const headCells: HeadCell<Data>[] = [
//   {
//     id: 'id',
//     numeric: true,
//     disablePadding: false,
//     label: 'id',
//   },
//   {
//     id: 'name',
//     numeric: true,
//     disablePadding: false,
//     label: 'id',
//   },
//   {
//     id: 'open',
//     numeric: true,
//     disablePadding: false,
//     label: 'id',
//   },
//   {
//     id: 'url',
//     numeric: true,
//     disablePadding: false,
//     label: 'id',
//   },
//   {
//     id: 'childrens',
//     numeric: true,
//     disablePadding: false,
//     label: 'id',
//   },
//   {
//     id: 'userPermission',
//     numeric: true,
//     disablePadding: false,
//     label: 'id',
//   }
// ]

const tableHead: TableHeads<keyof Item> = [
  {

    columnId: 1,
    columnName: 'id',
    columnType: 'num',
    // disablePadding: true
  },
  {
    columnId: 2,
    columnName: 'name',
    columnType: 'str'
  },
  {
    columnId: 3,
    columnName: 'url',
    columnType: 'str'
  },
  {
    columnId: 4,
    columnName: 'page_permission',
    columnType: 'num'
  }
]

const RightList = () => {
  const [sideMenuData, setSideMenuDate] = useState<TableBodys<keyof Item>>([]);
  const [orderBy, setOrderBy] = React.useState<Order>('asc');
  const [sortBy, setSortBy] = React.useState<keyof Item>('id');

  useEffect(() => {
    const fetchData = async () => {
      const data: AxiosResponse<{ data: TableBodys<keyof Item> }> = await axios.get('http://localhost:8080/pressRelease/sideMenuList')
      setSideMenuDate(data.data.data);
    }
    fetchData();
  }, [])

  const sortData = useCallback(() => {
    return (property: keyof Item) => sideMenuData.sort((o1, o2) => {
      const column1 = orderBy !== 'asc' ? o1[property] : o2[property];
      const column2 = orderBy === 'asc' ? o1[property] : o2[property];
      return column1 > column2 ? 1 : column1 < column2 ? -1 : 0
    })
  }, [sideMenuData, orderBy])

  /**
   * 
   * @param event 傳入的事件
   * @param property 要排序的欄位 
   */
  const handleSortColumn = (property: keyof Item) => {
    const isAsc = sortBy === property && orderBy === 'asc';
    setOrderBy(isAsc ? 'desc' : 'asc');
    setSortBy(property);
    
    const sort = sortData();
    setSideMenuDate(sort(property));
    console.log('sideMenuData ...', sideMenuData);
    
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTable head={tableHead} body={sideMenuData} sort={{ sortBy, orderBy, sortColumn: handleSortColumn }} />
      </Paper>
    </Box>
  )
}

export default RightList