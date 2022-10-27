import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import {
  useGetTokenQuery,
  useListAccountApplicationsQuery,
} from "../redux/api";
import { useEffect, useState } from "react";
import { Select, MenuItem, InputLabel, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Popover } from "@mui/material";
import PetDetailPopover from "../pets/PetDetailPopover";


export default function AccountApplications() {
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();

  const {
    data: applicationData,
    error,
    isLoading,
  } = useListAccountApplicationsQuery();

  const [appList, setAppList] = useState([]);
  const [status, setStatus] = useState("All");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clickedId, setClickedId] = useState(null)
  const handleDetailClick = (event, id) => {
    setClickedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleDetailClose = () => {
    setClickedId(null)
    setAnchorEl(null);
  };
  const openDetail = Boolean(anchorEl);
  const popoverClassName = openDetail ? "simple-popover" : undefined;

  useEffect(() => {
    if (applicationData) {
      setAppList(applicationData.applications);
    }
  }, [applicationData]);

  if (tokenLoading) {
    return <h1>Loading...</h1>;
  }

  if (isLoading) {
    return <h1>Loading application data...</h1>;
  }

  const { applications } = applicationData


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
    <Container sx={{ paddingTop: 10 }}>
      <Typography variant="h3" align="center" sx={{ mb: 3 }}>My Applications</Typography>
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
                color: "#FFF"
              },
            }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>
                <InputLabel id='demo-simple-select-label' sx={{ color: "#FFF" }}>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Status'
                  value={status}
                  onChange={handleChange}
                  size='small'
                  sx={{ color: "#FFF", border: '1px solid #ced4da' }}
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
                  <Button aria-describedby={popoverClassName} onClick={(e) => handleDetailClick(e, application.pet.id)}>
                    {application.pet.name}
                  </Button>
                  <Popover
                    id={popoverClassName}
                    open={clickedId === application.pet.id ? openDetail : false}
                    anchorEl={anchorEl}
                    onClose={handleDetailClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >
                    <PetDetailPopover petId={application.pet.id} />
                  </Popover>
                </TableCell>
                <TableCell align='center'>{application.pet.type}</TableCell>
                <TableCell align='center'>{application.pet.breed}</TableCell>
                <TableCell align='center'>
                  {application.status === "Approved" ?
                    <Link to={`/applications/${application.id}/stories/new`}>Approved - Share your story!</Link> :
                    application.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
