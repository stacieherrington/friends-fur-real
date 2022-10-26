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
import { useGetTokenQuery } from '../redux/api';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#294C60",
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

function StyledBodyRow(props) {
    const {
        data: tokenData,
        error: tokenError,
        isLoading: tokenLoading,
    } = useGetTokenQuery();

    const { email, first_name, last_name } = props.staff;
    const { setRefresh, refresh } = props;
    const handleDemote = () => {
        const demoteUrl = `${process.env.REACT_APP_API_HOST}/api/accounts/demote/${email}`;
        const fetchConfig = {
            method: "PATCH",
            credentials: "include",
        };
        fetch(demoteUrl, fetchConfig)
            .then(res => res.json())
            .then(data => {
                if (data) setRefresh(refresh => refresh + 1)
            })
            .catch(e => console.error(e))
    }
    if (tokenData)
        return (
            <StyledTableRow >
                <StyledTableCell sx={{ p: 1 }} align="center">{first_name}</StyledTableCell>
                <StyledTableCell sx={{ p: 1 }} align="center">{last_name}</StyledTableCell>
                <StyledTableCell sx={{ p: 1 }} align="center">{email}</StyledTableCell>
                <StyledTableCell sx={{ p: 1 }} align="center">{props.staff.roles.includes('admin') ?
                    <Typography>Admin</Typography>
                    :
                    < Button size='small' variant="contained"
                        sx={{ backgroundColor: "#294C60" }}
                        onClick={handleDemote}>Demote</Button>}
                </StyledTableCell>
            </StyledTableRow >)
}

export default function StaffTable(props) {
    const { staffList, setRefresh, refresh } = props;

    return (
        <Paper elevation={6} sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <Typography sx={{ py: 2 }} variant="h6" align="center">Staff List</Typography>
            <TableContainer sx={{ maxHeight: 342, }}>
                <Table sx={{ minWidth: 360 }} aria-label="staff table">
                    <TableHead sx={{ backgroundColor: "#294C60" }}>
                        <StyledTableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Last Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {staffList.map(s => (
                            <StyledBodyRow key={s.id} staff={s} refresh={refresh} setRefresh={setRefresh} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
