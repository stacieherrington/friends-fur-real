import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


function createData(name, email, pet, status, application_detail) {
  return { name, email, pet, status, application_detail };
}

const rows = [
  createData('John Wick', 'jwick@email.com', 'pet_name', 'status', 'application_id'),
  createData('John Wick', 'jwick@email.com', 'pet_name', 'submitted', 'application_id'),
  createData('John Wick', 'jwick@email.com', 'pet_name', 'status', 'application_id'),
];

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.status,
});

const ApplicationStatus = [
  { status: 'Submitted' },
  { status: 'Pending' },
  { status: 'Approved' },
];


export default function ApplicationList() {
  return (
    <Container sx={{ padding: 0 }} >
      <h1>Application Lists</h1>
      <TableContainer component={Paper}>
        <Table sx={{
          width: "fit-content 100%",
        }}
          aria-label="simple table">
          <TableHead sx={{
            background: "#CFE0FB",
            alignItems: 'center',
            "& th": {
              fontSize: "1rem",
              fontWeight: 'bold',
              textAlign: 'center'
            },
          }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Pet Name</TableCell>
              <TableCell >
                <Autocomplete
                  id="application-filter"
                  options={ApplicationStatus}
                  size="small"
                  sx={{ width: 'auto' }}
                  getOptionLabel={(option) => option.status}
                  filterOptions={filterOptions}
                  renderInput={(params) => <TextField {...params} label="Filter Status" />} />
              </TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.pet}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.application_detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );
}
