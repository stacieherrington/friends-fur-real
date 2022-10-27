import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Menu } from "@mui/material";
import {
  useGetPetQuery,
  useGetTokenQuery,
  useListAccountApplicationsQuery,
} from "../redux/api";
import { useLogoutMutation } from "../redux/api";
import { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel } from "@mui/material";

// import {uset}

export default function AccountApplications() {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const {
    data: petData,
    error: petError,
    isLoading: perLoading,
  } = useGetPetQuery();
  const [logout, { data: logoutData }] = useLogoutMutation();

  const {
    data: applicationData,
    error,
    isLoading,
  } = useListAccountApplicationsQuery();

  const [appList, setAppList] = useState([]);
  const [status, setStatus] = useState("All");

  useEffect(() => {
    if (applicationData) {
      setAppList(applicationData.applications);
    }
  }, [applicationData]);

  if (tokenLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoading) {
    return <h1>Loading applicationData...</h1>;
  }

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);

    event.target.value === "All"
      ? setAppList(applicationData.applications)
      : setAppList(
          applicationData.applications.filter(
            (app) => app.status === event.target.value
          )
        );
  };

  return (
    <Container sx={{ paddingTop: 10 }}>
      <h1>My Applications</h1>

      <TableContainer component={Paper}>
        <Table
          sx={{
            width: "fit-content 100%",
          }}
          aria-label='simple table'
        >
          <TableHead
            sx={{
              background: "#CFE0FB",
              alignItems: "center",
              "& th": {
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                padding: 1,
              },
            }}
          >
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Pet Id</TableCell>
              <TableCell>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Status'
                  value={status}
                  onChange={handleChange}
                  size='small'
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Approved"}>Approved</MenuItem>
                  <MenuItem value={"Submitted"}>Submitted</MenuItem>
                  <MenuItem value={"Rejected"}>Rejected</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appList.map((application) => (
              <TableRow
                key={application.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {application.first_name}
                </TableCell>
                <TableCell align='center'>{application.last_name}</TableCell>
                <TableCell align='center'>{application.phone_number}</TableCell>
                <TableCell align='center'>{application.pet_id}</TableCell>
                <TableCell align='center'>{application.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
