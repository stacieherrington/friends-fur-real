import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Paper,
  Container,
  TextField,
  Autocomplete,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import { useSingleAccountQuery } from "../redux/api";
import UpdateAccountForm from "./UpdateAccountForm";

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
    "Grape Wick",
    "jwick@email.com",
    "pet_name",
    "status",
    "application_id"
  ),
  createData(
    "Steve Wick",
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
const trows = [
  createData(
    "white Wick",
    "jwick@email.com",
    "pet_name",
    "status",
    "application_id"
  ),
  createData(
    "orange Wick",
    "jwick@email.com",
    "pet_name",
    "submitted",
    "application_id"
  ),
  createData(
    "brown Wick",
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

const ProfileDetails = (props) => {
  const [open, setOpen] = useState(false);
  const {
    data: accountData,
    error: accountError,
    isLoading: accountLoading,
  } = useSingleAccountQuery();
  if (accountError) {
    console.log(accountError);
  }
  if (!accountData) {
    return <>Loading....</>;
  }
  if (accountLoading) {
    return <>Loading...</>;
  }

  const addressMap = Object.entries(accountData.address);
  return (
    <Card>
      <CardMedia
        component='img'
        height='400'
        width='auto'
        src={accountData.picture}
        alt={accountData.first_name}
        image={null}
      />
      <Button>Change Profile Picture</Button>
      <CardContent>
        <TableContainer component={Paper}>
          <h1>{accountData.first_name}'s Page!</h1>
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
            ></TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Name:</TableCell>
                <TableCell>
                  {`${accountData.first_name} ${accountData.last_name}`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>About Me:</TableCell>
                <TableCell>{accountData.about_me}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Picture:</TableCell>
                <TableCell>{accountData.picture}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <IconButton
                    aria-label='expand row'
                    size='small'
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    Address:
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Table>
              <TableBody>
              
                {addressMap.map((e) => (
                  <TableRow key={e[0]}>
                    <TableCell>
                      {e[0] === "address_one"
                        ? "address one"
                        : e[0] === "address_two"
                        ? "address two"
                        : e[0].replace("_", "")}
                      :
                    </TableCell>
                    <TableCell>{e[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableContainer>
      </CardContent>
      <CardActions>
        <UpdateAccountForm data={accountData} />
      </CardActions>
    </Card>
  );
};

export default function AccountProfile() {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth={"xl"} sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={7} rowspacing={4}>
            <ApplicationList />
            <br></br>
          </Grid>
          <Grid item xs={5}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
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
