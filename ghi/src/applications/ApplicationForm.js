import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SmokeFreeSharpIcon from "@mui/icons-material/SmokeFreeSharp";
import SmokingRoomsSharpIcon from "@mui/icons-material/SmokingRoomsSharp";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";

const theme = createTheme();

export default function ApplicationForm() {
  const residences = [
    { name: "Single Family Home" },
    { name: "Single Family w/ large yard" },
    { name: "Apartment" },
    { name: "Townhouse" },
    { name: "Condo" },
  ];

  const [application, setApplication] = useState({
    first_name: "",
    last_name: "",
    date_ready: "",
    phone_number: "",
    landlord_restrictions: "",
    residence_type: "",
  });

  const [boolValues, setBoolValues] = useState({
    has_small_children: false,
    has_dogs: false,
    has_cats: false,
    wants_prepproval: false,
    agrees_to_terms: false,
    residence_owned: false,
    smoke_free_home: true,
  });
  const handleCheckbox = (event) => {
    setBoolValues({
      ...boolValues,
      [event.target.name]: event.target.checked,
    });
  };
  const handleInputChange = (event) => {
    setApplication({ ...application, [event.target.name]: event.target.value });
  };

  const handleReset = () => {
    setApplication(application);
    setBoolValues(boolValues);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_HOST}/api/applications`, {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        ...application,
        ...boolValues,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((event) => console.log("post error", event));
    handleReset();
  };

  const {
    has_small_children,
    smoke_free_home,
    has_dogs,
    has_cats,
    wants_prepproval,
    agrees_to_terms,
    residence_owned,
  } = boolValues;

  const error = [agrees_to_terms].filter((v) => v).length < 1;
  const smokeLabel = smoke_free_home ? "non-smoker" : `smoker`;
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

            <TextField
              id='outlined-select-residence'
              select
              fullWidth
              name='residence_type'
              label='Residence Type'
              onChange={handleInputChange}
              value={application.residence_type}
            >
              {residences.map((event) => (
                <MenuItem key={event.name} value={event.name}>
                  {event.name}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: "flex", m: 3 }}>
              <FormControl component='fieldset' variant='standard'>
                <FormLabel component='legend'>Select all that apply:</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={has_dogs}
                        onChange={handleCheckbox}
                        name='has_dogs'
                      />
                    }
                    label='Own dogs'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={has_cats}
                        onChange={handleCheckbox}
                        name='has_cats'
                      />
                    }
                    label='Own cats'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={smoke_free_home}
                        onChange={handleCheckbox}
                        name='smoke_free_home'
                        icon={<SmokingRoomsSharpIcon color='error' />}
                        checkedIcon={<SmokeFreeSharpIcon color='success' />}
                      />
                    }
                    label={smokeLabel}
                  />
                </FormGroup>
              </FormControl>
              <FormControl component='fieldset' variant='standard'>
                <FormLabel component='legend'>
                  <br></br>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={has_small_children}
                        onChange={handleCheckbox}
                        name='has_small_children'
                      />
                    }
                    label='Have small children'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={residence_owned}
                        onChange={handleCheckbox}
                        name='residence_owned'
                      />
                    }
                    label='Residence Owned'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={wants_prepproval}
                        onChange={handleCheckbox}
                        name='wants_prepproval'
                      />
                    }
                    label='Pre-Approval?'
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Box sx={{ m: 3 }}>
              <FormControl
                required
                error={error}
                component='fieldset'
                variant='standard'
              >
                <FormLabel>Required*</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<DoneOutlineSharpIcon color='success' />}
                      checked={agrees_to_terms}
                      onChange={handleCheckbox}
                      name='agrees_to_terms'
                    />
                  }
                  label='I agree to the Terms and Conditions* *'
                />
              </FormControl>
            </Box>

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
