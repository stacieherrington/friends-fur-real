import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 20,
        fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const tbr = <StyledTableRow>
    <StyledTableCell sx={{ p: 1 }} align="center">First</StyledTableCell>
    <StyledTableCell sx={{ p: 1 }} align="center">Last</StyledTableCell>
    <StyledTableCell sx={{ p: 1 }} align="center">email@email.com</StyledTableCell>
    <StyledTableCell sx={{ p: 1 }} align="center"><Button size='small' variant="contained" color="secondary">Demote</Button></StyledTableCell>
</StyledTableRow>;
const tbRows = [];
for (let i = 0; i < 6; i++) { tbRows.push(tbr) }

export default function StaffTable(props) {
    // const { staffList } = props;
    // const staffList, setStaffList = useState(staffList)
    return (
        <Paper elevation={6} sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <Typography sx={{ py: 2 }} variant="h6" align="center">Staff List</Typography>
            <TableContainer sx={{ maxHeight: 342, }}>
                <Table sx={{ minWidth: 360 }} aria-label="staff table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Last Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {/* {staffList.map(s=>(
                            <StyledTableRow>
                                <StyledTableCell sx={{ p: 1 }} align="center">{s.first_name}</StyledTableCell>
                                <StyledTableCell sx={{ p: 1 }} align="center">{s.last_name}</StyledTableCell>
                                <StyledTableCell sx={{ p: 1 }} align="center">{s.email}</StyledTableCell>
                                <StyledTableCell sx={{ p: 1 }} align="center"><Button size='small' variant="contained" color="secondary">Demote</Button></StyledTableCell>
                            </StyledTableRow>
                        ))} */}
                        {tbRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
