import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { useSingleAccountQuery } from "../redux/api";
import { useGetTokenQuery } from "../redux/api";
import { usePatchUpdateAccountMutation } from "../redux/api";

const theme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 800,
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  mt: 3,
  overflow: "auto",
};

function createData(name, email, pet, status, application_detail) {
  return { name, email, pet, status, application_detail };
}

const rows = [
  createData(
    "John Wick",
    "jwick@email.com",
    "pet_name",
    "status",
    "application_id"
  ),
  createData(
    "John Wick",
    "jwick@email.com",
    "pet_name",
    "submitted",
    "application_id"
  ),
  createData(
    "John Wick",
    "jwick@email.com",
    "pet_name",
    "status",
    "application_id"
  ),
];

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.status,
});

const ApplicationStatus = [
  { status: "Submitted" },
  { status: "Pending" },
  { status: "Approved" },
];

const ApplicationList = () => {
  return (
    <TableContainer component={Paper}>
      <h1>Applications</h1>
      <Table aria-label='simple table'>
        <TableHead
          sx={{
            background: "#CFE0FB",
            alignItems: "center",
            "& th": {
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
            },
          }}
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>
              <Autocomplete
                id='application-filter'
                options={ApplicationStatus}
                size='small'
                sx={{ width: "auto" }}
                getOptionLabel={(option) => option.status}
                filterOptions={filterOptions}
                renderInput={(params) => (
                  <TextField {...params} label='Filter Status' />
                )}
              />
            </TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>{row.pet}</TableCell>
              <TableCell align='center'>{row.status}</TableCell>
              <TableCell align='center'>{row.application_detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Favorites = () => {
  return (
    <TableContainer component={Paper}>
      <h1>Favorites</h1>
      <Table aria-label='simple table' flex margin={0}>
        <TableHead
          sx={{
            background: "#CFE0FB",
            alignItems: "center",
            "& th": {
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
            },
          }}
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>
              <Autocomplete
                id='application-filter'
                options={ApplicationStatus}
                size='small'
                sx={{ width: "auto" }}
                getOptionLabel={(option) => option.status}
                filterOptions={filterOptions}
                renderInput={(params) => (
                  <TextField {...params} label='Filter Status' />
                )}
              />
            </TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.email}</TableCell>
              <TableCell align='center'>{row.pet}</TableCell>
              <TableCell align='center'>{row.status}</TableCell>
              <TableCell align='center'>{row.application_detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProfileDetails = () => {
  return (
    <Card>
      <CardMedia />
      <CardContent>
        <Typography>hey</Typography>
      </CardContent>
    </Card>
  );
};

export default function AccountProfile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const {
    data: accountData,
    error: accountError,
    isLoading: accountLoading,
  } = useSingleAccountQuery();
  const [
    updateAccount,
    {
      data: updateData,
      error: updateError,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
    },
  ] = usePatchUpdateAccountMutation();
  if (accountLoading) {
    return <>Loading....</>;
  }
  if (updateSuccess) {
    setTimeout(() => {
      handleClose();
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <Button onClick={handleOpen}>Update Profile</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Container disableGutters maxWidth={"xl"} sx={{ mt: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <ApplicationList />
                <Favorites />
              </Grid>
              <Grid item xs={5}>
                <ProfileDetails />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
    // <Grid
    //   container
    //   spacing={{ xs: 2, md: 3 }}
    //   columns={{ xs: 4, sm: 8, md: 12 }}
    //   sx={{ width: "fit-content", padding: 10 }}
    // >
    //   {Array.from(Array(1)).map((_, index) => (
    //     <Grid xs={3} sm={3} md={3} key={index}>
    //       <ApplicationList />

    //       <Favorites />

    //       <ProfileDetails />
    //     </Grid>
    //   ))}
    // </Grid>
  );
}
