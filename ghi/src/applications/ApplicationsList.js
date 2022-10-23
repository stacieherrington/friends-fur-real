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
import { useGetTokenQuery } from "../redux/api"
import { useLogoutMutation } from "../redux/api";


export default function ApplicationList() {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery(); 
  const [logout, { data: logoutData }] = useLogoutMutation();
  const { data: applications } = useGetTokenQuery("application");

  console.log(applications)

  if (tokenLoading) { return <h1>Loading...</h1>; }

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
            {/* {applications.map((application) => ( */}
              <TableRow
              // key={application.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">pet</TableCell>
              <TableCell align="center">status</TableCell>
              <TableCell align="center">detail</TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Container >
  );
}
