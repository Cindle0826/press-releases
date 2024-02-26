import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import EnhancedTable from '../../../../components/table/EnhancedTable';
import { Order, TableBodys, TableHeads } from '../../../../components/table/TableTypes';
import { Box, Button, ButtonGroup, Paper } from '@mui/material'
import { Item } from '../../interfaces';
import { orange } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    columnLabel: 'id',
    columnType: 'num',
    // disablePadding: true
  },
  {
    columnId: 2,
    columnName: 'name',
    columnLabel: '權限名稱',
    columnType: 'str'
  },
  {
    columnId: 3,
    columnName: 'url',
    columnLabel: '權限路徑',
    columnType: 'str',
    render: columnValue => (
      <div style={{ backgroundColor: orange[200], padding: '5px' }}>{`/${columnValue}`}</div>
    )
  },
  {
    columnId: 4,
    columnName: 'page_permission',
    columnLabel: '是否啟用',
    columnType: 'num',
    render: columnValue => (
      <ButtonGroup variant='outlined'>
        <Button>{<EditIcon />}</Button>
        <Button>{<DeleteIcon />}</Button>
      </ButtonGroup>
    )
  }
]

const RightList = () => {
  const [sideMenuData, setSideMenuDate] = useState<TableBodys<keyof Item>>([]);
  const [orderBy, setOrderBy] = useState<Order>('asc');
  const [sortBy, setSortBy] = useState<keyof Item>('id');

  useEffect(() => {
    const fetchData = async () => {
      const data: AxiosResponse<{ data: TableBodys<keyof Item> }> = await axios.get('http://localhost:8080/pressRelease/sideMenuList')
      setSideMenuDate(data.data.data);
    }
    fetchData();
  }, [])

  /**
   * 
   * @param property 要排序的欄位 
   */
  const handleSortColumn = (property: keyof Item) => {
    const isAsc = sortBy === property && orderBy === 'asc';
    setOrderBy(isAsc ? 'desc' : 'asc');
    setSortBy(property);
    // console.log('seetOrderBy func ...', orderBy);
  };
  // console.log('current render ...', renderData, 'page ...', page);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTable head={tableHead} body={sideMenuData} rowsPerPageData={[5, 10, 20]} sort={{ sortBy, orderBy, sortColumn: handleSortColumn }} />
      </Paper>
    </Box>
  )
}

export default RightList