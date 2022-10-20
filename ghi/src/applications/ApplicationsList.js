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
import { useState, useEffect } from 'react';
import { useGetTokenQuery } from "./redux/api";
import { useLogoutMutation } from "./redux/api";




export const loadApplications = async () => {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const [logout, { data: logoutData }] = useLogoutMutation();

  console.log(tokenData)


const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.status,
});

const ApplicationStatus = [
  { status: 'Submitted' },
  { status: 'Pending' },
  { status: 'Approved' },
];


  return (
    <Container sx={{ paddingTop: 10 }} >
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
              textAlign: 'center',
              padding: 1,
            },
          }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Pet</TableCell>
              <TableCell>      
                <Autocomplete
                  id="application-filter"
                  options={ApplicationStatus}
                  size="small"
                  sx={{ width: 'auto' }}
                  getOptionLabel={(props) => props.status}
                  filterOptions={filterOptions}
                  renderInput={(status) => <TextField {...status} label="Filter Status" />} />
              </TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationsList.map((application) => (
              <TableRow
                key={props.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{application.name}</TableCell>
                <TableCell align="center">{application.email}</TableCell>
                <TableCell align="center">{application.pet}</TableCell>
                <TableCell align="center">{application.status}</TableCell>
                <TableCell align="center">{application.application_detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );
}
