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
  Typography,
  Box,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery, useSingleAccountQuery } from "../redux/api";
import UpdateAccountForm from "./UpdateAccountForm";
import AccountApplications from "../applications/AccountApplications";

// const theme = createTheme();

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   height: 800,
//   width: 600,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   mt: 3,
//   overflow: "auto",
// };

// const ProfileDetails = (props) => {

//   return (

//   );
// };

export default function AccountProfile(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    data: accountData,
    error: accountError,
    isLoading: accountLoading,
  } = useSingleAccountQuery();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  // if (accountError) {
  //   alert(accountError);
  // }

  if (!token && !tokenLoading) {
    setTimeout(() => {
      navigate("/");
    }, 0);
  }
  if (!accountData) {
    return <>Loading....</>;
  }
  if (accountLoading) {
    return <>Loading...</>;
  }

  console.log(accountData);
  const addressMap = Object.entries(accountData.address);
  return (
    <Container disableGutters maxWidth={"xl"} sx={{ mt: 10 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
        <Grid
          sx={{ textAlign: "center" }}
          item
          xs={4}
          sm={6}
          md={8}
          lg={10}
          rowspacing={4}
        >
          {accountData.first_name ? (
            <Typography variant='h3'>
              {accountData.first_name}'s Profile
            </Typography>
          ) : (
            <Typography variant='h3'>My Profile</Typography>
          )}
          {/* <ApplicationList /> */}
          <br></br>
          <AccountApplications />
        </Grid>
        <Grid item xs={4} sm={6} md={8} lg={10}>
          <Card>
            <CardMedia
              component='img'
              sx={{ mx: "auto", maxWidth: "40%" }}
              src={
                accountData.picture
                  ? accountData.picture
                  : "/images/addphoto.webp"
              }
              alt={
                accountData.first_name
                  ? accountData.first_name
                  : "add a display photo!"
              }
            />
            <Box sx={{ textAlign: "center" }}>
              <Button>Change Profile Picture</Button>
            </Box>
            <CardContent>
              <TableContainer component={Paper}>
                {accountData.first_name ?
                  <Box textAlign='center'><h1>{`${accountData.first_name}`}'s details</h1></Box>
                :<Box textAlign='center'><h3>My details</h3></Box>
                }

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
                        {accountData.first_name && accountData.last_name
                          ? `${accountData.first_name} ${accountData.last_name}`
                          : ""}
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
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
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
        </Grid>
      </Grid>
    </Container>
  );
}
