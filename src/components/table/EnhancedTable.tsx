import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, useTheme } from '@mui/material'
import { visuallyHidden } from '@mui/utils';
import { EnhancedTableProps } from './TableTypes'
import { useMemo, useState } from 'react';

const EnhancedTable = <T extends string>({ head, body, rowsPerPageData, sort }: EnhancedTableProps<T>) => {
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageData[0]);
    const [page, setPage] = useState<number>(0);
    const [value, setValue] = useState<number | ''>(page + 1);
    const rowsPerPageOptions = useMemo(() => rowsPerPageData, [rowsPerPageData]);
    const theme = useTheme();

    // 依據組件資料、排序欄位、排序順序，修改資料
    const renderData = useMemo(() => {
        // page 第幾頁 rowsPerPage 每頁有幾筆
        let result = body;
        if (sort?.sortBy && sort?.orderBy) {
            // console.log('enter orderby', sort.orderBy);
            result = result.sort((o1, o2) => {
                const column1 = sort.orderBy === 'asc' ? o1[sort.sortBy] : o2[sort.sortBy] || "";
                const column2 = sort.orderBy !== 'asc' ? o1[sort.sortBy] : o2[sort.sortBy] || "";

                return column1 > column2 ? 1 : column1 < column2 ? -1 : 0
            })
        }

        return result.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage);
    }, [body, page, rowsPerPage, sort?.sortBy, sort?.orderBy])

    // console.log('round 2', 'orderBy ', sort?.orderBy, 'sortBy ', sort?.sortBy);

    // 更新當前頁面有幾列 rows
    const handleRowsPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value))
        setPage(0)
        setValue(1)
    }

    // 更新當前頁面 page
    const handleOnPageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        setPage(page)
    }

    // 透過輸入更新當前頁面
    const handleChangePage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValue(value === '' ? '' : +value);
    }

    // 按下 enter 跳轉頁面
    const handleJumpPage = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && value !== '') {
            // 最多有幾頁 ceil 無條件進位
            const pageMaxNum = Math.ceil(body.length / rowsPerPage);
            if (value <= 0) {
                setPage(0)
            } else if (value >= pageMaxNum) {
                setPage(pageMaxNum - 1)
            } else {
                setPage(+value - 1)
            }
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TableContainer style={{ flex: 1 }}>
                <Table sx={{
                    minWidth: 750,
                    height: 'auto'
                }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <TableHead sx={{ backgroundColor: theme.palette.secondary.main }}>
                        <TableRow>
                            {/* <TableCell padding="checkbox">
                        <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                        />
                    </TableCell> */}
                            {head.map(h => (
                                <TableCell
                                    key={h.columnId}
                                    // align={h.columnType === 'num' ? 'right' : 'left'}
                                    padding={h.disablePadding ? 'none' : 'normal'}
                                    // sortDirection={orderBy === headCell.id ? order : false}
                                    sx={{ color: 'black' }}
                                >
                                    {sort &&
                                        <TableSortLabel
                                            active={sort.sortBy === h.columnName}
                                            direction={sort.sortBy === h.columnName ? sort.orderBy : 'asc'}
                                            onClick={e => sort?.sortColumn(h.columnName)}
                                        >
                                            {sort.sortBy === h.columnName ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {sort.orderBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>}
                                    {h.columnLabel}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            renderData.map((b, index) => (
                                <TableRow key={index} >
                                    {
                                        head.map(h => (
                                            <TableCell
                                                key={`${index}-${h.columnId}`}
                                                sx={{ flex: 1 }}
                                            // align={h.columnType === 'num' ? 'right' : 'left'}
                                            >
                                                {h.render ? h.render(b[h.columnName]) : b[h.columnName]}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TextField
                    variant='outlined'
                    placeholder='page'
                    type={'number'}
                    value={value}
                    onChange={handleChangePage}
                    onKeyDown={handleJumpPage}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '4px', // 調整邊框的圓角大小
                            borderWidth: '1px', // 調整邊框的寬度
                            padding: '8px', // 調整內部填充
                            margin: '12% 0',
                            width: '100px'
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '0', // 調整文字輸入框的填充
                        },

                    }}
                />
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component={'div'}
                    page={page}
                    count={body.length}
                    rowsPerPage={rowsPerPage}
                    // 修改第幾頁
                    onPageChange={handleOnPageChange}
                    // 這一頁總共可以有幾列
                    onRowsPerPageChange={handleRowsPageChange}
                    sx={{ display: 'inline', paddingLeft: '50%' }}
                />
            </Box>
        </div>
    )
}

export default EnhancedTable