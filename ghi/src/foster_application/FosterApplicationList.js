import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import {
  useGetTokenQuery,
  useListRescueFosterApplicationsQuery,
} from "../redux/api";
import { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";

export default function FosterApplicationList() {
  const { isLoading: tokenLoading } = useGetTokenQuery();
  const { data: fosterApplicationData, isLoading } =
    useListRescueFosterApplicationsQuery();
  const [fosterList, setfosterList] = useState([]);
  const [status, setStatus] = useState("All");

  useEffect(() => {
    if (fosterApplicationData) {
      setfosterList(fosterApplicationData.foster_applications);
    }
  }, [fosterApplicationData]);

  if (tokenLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoading) {
    return <h1>Loading foster_applications...</h1>;
  }

  const { fosterData } = fosterApplicationData;

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);

    event.target.value === "All"
      ? setfosterList(fosterData)
      : setfosterList(
          fosterData.filter((app) => app.status === event.target.value)
        );
  };

  return (
    <Container sx={{ paddingTop: 12 }}>
      <Typography
        variant='h3'
        align='center'
        sx={{ pb: 5, fontWeight: "bold" }}
      >
        Application List
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            width: "fit-content 100%",
          }}
          aria-label='simple table'
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
                  id='demo-simple-select-label'
                  sx={{ color: "#FFF" }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Status'
                  value={status}
                  onChange={handleChange}
                  size='small'
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
            {fosterList.map((fosterApplication) => (
              <TableRow
                key={fosterApplication.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {fosterApplication.first_name}
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.last_name}
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.phone_number}
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.pet_id}
                </TableCell>
                <TableCell align='center'>
                  {fosterApplication.status}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    href={`/manage/foster_applications/${fosterApplication.id}`}
                  >
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
