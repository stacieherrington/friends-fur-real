import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { MuiTelInput } from "mui-tel-input";
import AppCheckbox from "./appCheckbox";
import SendSharpIcon from '@mui/icons-material/SendSharp';

function PhoneNumber() {
  const [phone, setPhone] = useState("");

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };
  return (
    <MuiTelInput
      value={phone}
      placeholder='Phone Number'
      onChange={handleChange}
      onlyCountries={["US"]}
      fullWidth
    />
  );
}

function ResidenceSelector() {
  const residences = [
    { value: "Single Family", label: "Single Family" },
    { value: "Apartment", label: "Apartment" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Condo", label: "Condo" },
  ];
  const [residenceType, setResidenceType] = React.useState("");
  const handleSelect = (event) => {
    setResidenceType(event.target.value);
  };
  return (
    <TextField
      id='outlined-select-residence'
      select
      fullWidth
      label='Residence Type'
      value={residenceType}
      onChange={handleSelect}
    >
      {residences.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

const theme = createTheme();

export default function ApplicationForm() {
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [date_ready, setDate_ready] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      phone_number: data.get("phoneNumber"),
      date_ready: data.get("date_ready"),
      landlord_restrictions: data.get("landlord_restrictions"),
      residence_type: data.get("residence_type"),
      has_dogs: data.get("has_dogs"),
      has_cats: data.get("has_cats"),
      smoker: data.get("smoker"),
      has_small_children: data.get("has_small_children"),
      residence_owned: data.get("residence_owned"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#CFE0FB" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Application Form
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate>
            <TextField
              margin='normal'
              required
              fullWidth
              id='first_name'
              placeholder='First Name'
              name='first_name'
              autoComplete='current-first-name'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='last_name'
              placeholder='Last Name'
              type='text'
              id='last_name'
              autoComplete='current-last-name'
            />
            <PhoneNumber />
            <TextField
              margin='normal'
              required
              fullWidth
              name='date_ready'
              placeholder='Date Ready'
              type='date'
              id='date_ready'
              autoComplete='current-date'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              maxRows={4}
              name='landlord_restrictions'
              placeholder='Landlord Restrictions'
              type='text'
              id='landlord_restrictions'
              autoComplete='current-landlord-restrictions'
            />
            <ResidenceSelector />
            <AppCheckbox />

            <Button
              type='submit'
              fullWidth
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
              color='success'
              endIcon={<SendSharpIcon/>}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 10, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
