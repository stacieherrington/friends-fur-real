import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Menu } from "@mui/material";
import { useGetTokenQuery, useListRescueApplicationsQuery } from "../redux/api";
import { useLogoutMutation } from "../redux/api";
import { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";

export default function ApplicationList() {
  const {

    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const [logout, { data: logoutData }] = useLogoutMutation();
  const {
    data: applicationData,
    error,
    isLoading,
  } = useListRescueApplicationsQuery();
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
    return <h1>Loading applications...</h1>;
  }

  const { applications } = applicationData;

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);

    event.target.value === "All"
      ? setAppList(applications)
      : setAppList(
          applications.filter((app) => app.status === event.target.value)
        );
  };

  return (
    <Container sx={{ paddingTop: 12 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ pb: 5, fontWeight: "bold" }}
      >
        Application List
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            width: "fit-content 100%",
          }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              background: "#294C60",
              alignItems: "center",
              "& th": {
                fontSize: "1rem",
                fontWeight: "bold",
                textAlign: "center",
                padding: 1,
                color: "#FFF",
              },
            }}
          >
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Pet Id</TableCell>
              <TableCell>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "#FFF" }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value={status}
                  onChange={handleChange}
                  size="small"
                  sx={{ color: "#FFF", border: "1px solid #ced4da" }}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Approved"}>Approved</MenuItem>
                  <MenuItem value={"Submitted"}>Submitted</MenuItem>
                  <MenuItem value={"Rejected"}>Rejected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appList.map((application) => (
              <TableRow
                key={application.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {application.first_name}
                </TableCell>
                <TableCell align="center">{application.last_name}</TableCell>
                <TableCell align="center">{application.phone_number}</TableCell>
                <TableCell align="center">{application.pet_id}</TableCell>
                <TableCell align="center">{application.status}</TableCell>
                <TableCell align="center">
                  <Button href={`/manage/applications/${application.id}`}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
