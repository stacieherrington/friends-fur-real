import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  useGetTokenQuery,
  useListAccountApplicationsQuery,
} from "../redux/api";
import CircularUnderLoad from "../components/ProgressCircle";

export default function AccountApplications() {
  const { isLoading: tokenLoading } = useGetTokenQuery();

  const { data: applicationData, isLoading } =
    useListAccountApplicationsQuery();

  const [appList, setAppList] = useState([]);
  const [status, setStatus] = useState("All");

  useEffect(() => {
    if (applicationData) {
      setAppList(applicationData.applications);
    }
  }, [applicationData]);

  if (tokenLoading) {
    return (
      <>
        <CircularUnderLoad />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <CircularUnderLoad />
      </>
    );
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
