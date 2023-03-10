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
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery, useSingleAccountQuery } from "../redux/api";
import UpdateAccountForm from "./UpdateAccountForm";
import AccountApplications from "../applications/AccountApplications";

export default function AccountProfile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data: accountData, isLoading: accountLoading } =
    useSingleAccountQuery();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

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

  const addressMap = Object.entries(accountData.address);
  return (
    <Container disableGutters maxWidth={"xl"} sx={{ mt: 10, mb: 4 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
        <Grid item xs={4} sm={6} md={8} lg={10} rowspacing={4}>
          <AccountApplications />
        </Grid>
        <Grid sx={{ alignItems: "center" }} item xs={4} sm={6} md={8} lg={10}>
          <Card>
            <CardMedia
              component='img'
              sx={{ maxWidth: "20vw", mx: "auto" }}
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
            <CardContent>
              <TableContainer component={Paper}>
                <Typography variant='h3' align='center'>
                  My Profile
                </Typography>
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
                          : accountData.first_name
                          ? `${accountData.first_name}`
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
            <CardActions sx={{ mb: 2 }}>
              <UpdateAccountForm data={accountData} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
