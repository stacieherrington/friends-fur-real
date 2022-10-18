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
import AppCheckbox from "./appCheckbox";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { MuiTelInput } from "mui-tel-input";

function ResidenceSelector() {
  const residences = [
    { value: "Single Family Home", label: "Single Family Home" },
    {
      value: "Single Family w/ large yard",
      label: "Single Family w/ large yard",
    },
    { value: "Apartment", label: "Apartment" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Condo", label: "Condo" },
  ];
  const [residenceType, setResidenceType] = useState("");
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
          {option.value}
        </MenuItem>
      ))}
    </TextField>
  );
}

const theme = createTheme();

export default function ApplicationForm() {
  const [application, setApplication] = useState({
    first_name: "",
    last_name: "",
    date_ready: "",
    phone_number: "",
    landlord_restrictions: "",
    has_small_children: "",
    has_dogs: "",
    has_cats: "",
    smoke_free_home: "",
    residence_owned: "",
    residence_type: [],
  });

  const handleInputChange = (event) => {
    setApplication({ ...application, [event.target.name]: event.target.value });
  };
  const handleReset = () => {
    setApplication({
      first_name: "",
      last_name: "",
      date_ready: "",
      phone_number: "",
      landlord_restrictions: "",
      has_small_children: "",
      has_dogs: "",
      has_cats: "",
      smoke_free_home: "",
      residence_owned: "",
      residence_type: [],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const applicationUrl = "http://localhost:8000/api/applications/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({ ...application }),
      headers: { "Content-Type": "application/json" },
    };
    fetch(applicationUrl, fetchConfig)
      .then((res) => res.json())
      .catch((event) => console.log("post error", event));
    handleReset();
  };

  // function InputFields(){
  // return(<></>)}
console.log(application)
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
              onChange={handleInputChange}
              value={application.first_name}
              type='text'
              id='first_name'
              name='first_name'
              placeholder='First Name'
              autoComplete='current-first-name'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              onChange={handleInputChange}
              value={application.last_name}
              type='text'
              id='last_name'
              name='last_name'
              placeholder='Last Name'
              autoComplete='current-last-name'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              placeholder='Phone Number'
              onChange={handleInputChange}
              value={application.phone_number}
              type='text'
              name='phone_number'
              id='phone_number'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              onChange={handleInputChange}
              value={application.date_ready}
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
              onChange={handleInputChange}
              value={application.landlord_restrictions}
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
              endIcon={<SendSharpIcon />}
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
