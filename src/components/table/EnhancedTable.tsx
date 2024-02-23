import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, useTheme } from '@mui/material'
import { visuallyHidden } from '@mui/utils';
import { EnhancedTableProps } from './TableTypes'
import { useCallback } from 'react';

const EnhancedTable = <T extends string>({ head, body, sort }: EnhancedTableProps<T>) => {
    const theme = useTheme();

    const handleSort = useCallback((property: typeof head[number]['columnName']) => {
        // sortColumn && sortColumn(event, property.columnName);
        console.log('round 1' ,'orderBy ', sort?.orderBy, 'sortBy ', sort?.sortBy, 'property ', property);
        if (sort?.sortColumn) {
            sort.sortColumn(property);
        }
        console.log('check ...');
        
    }, [sort])

    console.log('round 2' ,'orderBy ', sort?.orderBy, 'sortBy ', sort?.sortBy);

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
                                            onClick={e => handleSort(h.columnName)}
                                        >
                                            {sort.sortBy === h.columnName ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                    {sort.orderBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </Box>
                                            ) : null}
                                        </TableSortLabel>}
                                    {h.columnName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            body.map((b, index) => (
                                <TableRow key={index} >
                                    {
                                        head.map(h => (
                                            <TableCell
                                                key={`${index}-${h.columnId}`}
                                                sx={{ flex: 1 }}
                                            // align={h.columnType === 'num' ? 'right' : 'left'}
                                            >
                                                {b[h.columnName]}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default EnhancedTable