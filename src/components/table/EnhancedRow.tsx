import React from 'react'
import { TableRow, TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody, useTheme } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { EnhancedRows } from './TableTypes';

const EnhancedRow = <T extends string>({ head, body, children }: EnhancedRows<T>) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(e => !e);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {body.children && body.children.length > 0 ?
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={handleOpen}
                        >
                            {open ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                        :
                        <IconButton disabled={true}>
                            <RemoveIcon />
                        </IconButton>
                    }
                </TableCell>
                {/* <TableCell component="th" scope="row">
                    {body.}
                </TableCell> */}
                {
                    head.map(h => (
                        <TableCell
                            key={h.columnId}
                            align={h.columnType === 'num' ? 'right' : (h.columnType === 'str' ? 'left' : 'center')}
                        >
                            {h.render ? h.render(body[h.columnName]) : body[h.columnName]}
                        </TableCell>
                    ))
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={head.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {/* 板式
                             <Typography variant="h6" gutterBottom component="div">
                                Children
                            </Typography> */}
                            <Table size="small" aria-label="purchases">
                                <TableHead sx={{ backgroundColor: theme.palette.secondary.main }}>
                                    <TableRow>
                                        {
                                            children.childrenHeads.map(c => (
                                                <TableCell
                                                    key={c.columnId}
                                                    align={c.columnType === 'num' ? 'right' : (c.columnType === 'str' ? 'left' : 'center')}
                                                >
                                                    {c.columnLabel}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        body.children && body.children.map((b, index) => (
                                            <TableRow key={index}>
                                                {
                                                    children.childrenHeads.map((h, index) => {
                                                        return (
                                                            <TableCell
                                                                key={`${index}-${h.columnId}`}
                                                                align={h.columnType === 'num' ? 'right' : (h.columnType === 'str' ? 'left' : 'center')}
                                                            >
                                                                {h.render ? h.render(b[h.columnName]) : b[h.columnName]}
                                                            </TableCell>
                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        ))
                                    }
                                    {/* {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default EnhancedRow