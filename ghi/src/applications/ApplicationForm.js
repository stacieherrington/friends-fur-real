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
import Modal from "@mui/material/Modal";

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

export default function ApplicationForm(pet_id, rescue_id, name, petPicture) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const residences = [
    { name: "Single Family Home" },
    { name: "Single Family w/ large yard" },
    { name: "Apartment" },
    { name: "Townhouse" },
    { name: "Condo" },
  ];
  console.log(pet_id, rescue_id, name, petPicture);
  const [application, setApplication] = useState({
    first_name: "",
    last_name: "",
    address_one: "",
    address_two: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    date_ready: "",
    landlord_restrictions: "",
    residence_type: "",
    has_small_children: false,
    has_dogs: false,
    has_cats: false,
    wants_prepproval: false,
    agrees_to_terms: false,
    residence_owned: false,
    smoke_free_home: true,
  });

  const handleInputChange = (e) => {
    let { name, type, value, checked } = e.target;
    type === "checkbox" ? (value = checked) : (value = value);
    setApplication({ ...application, [name]: value });
  };
  const handleReset = () => {
    setApplication(application);
  };
  const handleSubmit = (e) => {
    e.preDefault();
    application["pet_id"] = [pet_id];
    application["rescue_id"] = [rescue_id];
    fetch(`${process.env.REACT_APP_API_HOST}/api/applications/`, {
      method: "post",
      credentials: "include",
      body: JSON.stringify({
        ...application,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((e) => console.log("post error", e));
    handleReset();
    handleClose();
  };

  const {
    first_name,
    last_name,
    address_one,
    address_two,
    city,
    state,
    zip_code,
    phone_number,
    date_ready,
    landlord_restrictions,
    residence_type,
    has_small_children,
    smoke_free_home,
    has_dogs,
    has_cats,
    wants_prepproval,
    agrees_to_terms,
    residence_owned,
  } = application;

  const error = [agrees_to_terms].filter((v) => v).length < 1;
  const smokeLabel = smoke_free_home ? "non-smoker" : `smoker`;

  // function FieldTest(){
  //   // let value = 'value'
  //   // let name = 'name'
  //   // let id = 'id'
  //   // let label = e.split('_')
  //   // let autoCompelte = 'autocomplete'

  //   return (
  //     <>
  //     {application.map((e)=>(
  //       <TextField
  //         margin='normal'
  //         required
  //         fullWidth
  //         onChange={handleInputChange}
  //         value={e.target}
  //         type='text'
  //         id={e.target}
  //         name={e.target}
  //         label={e.target.split('-')}
  //         autoComplete='current-first-name'
  //         autoFocus
  //       />))}
  //     </>
  //   );
  // };
  return (
    <ThemeProvider theme={theme}>
      <Button onClick={handleOpen}>Adopt me!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
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
              </Avatar>{" "}
              <Typography component='h1' variant='h5'>
                Adoption Application Form
              </Typography>
              <Box component='form' onSubmit={handleSubmit} noValidate>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={first_name}
                  type='text'
                  id='first_name'
                  name='first_name'
                  label='First Name'
                  autoComplete='current-first-name'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={last_name}
                  type='text'
                  id='last_name'
                  name='last_name'
                  label='Last Name'
                  autoComplete='current-last-name'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Address One'
                  onChange={handleInputChange}
                  value={address_one}
                  type='text'
                  name='address_one'
                  id='address_one'
                />
                <TextField
                  margin='normal'
                  fullWidth
                  label='Address Two'
                  onChange={handleInputChange}
                  value={address_two}
                  type='text'
                  name='address_two'
                  id='address_two'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='City'
                  onChange={handleInputChange}
                  value={city}
                  type='text'
                  name='city'
                  id='city'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='State'
                  onChange={handleInputChange}
                  value={state}
                  type='text'
                  name='state'
                  id='state'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Zip Code'
                  onChange={handleInputChange}
                  value={zip_code}
                  type='text'
                  name='zip_code'
                  id='zip_code'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Phone Number'
                  onChange={handleInputChange}
                  value={phone_number}
                  type='text'
                  name='phone_number'
                  id='phone_number'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={date_ready}
                  name='date_ready'
                  type='date'
                  id='date_ready'
                  autoComplete='current-date'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={landlord_restrictions}
                  multiline
                  maxRows={4}
                  name='landlord_restrictions'
                  label='Landlord Restrictions'
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
                  value={residence_type}
                >
                  {residences.map((e) => (
                    <MenuItem key={e.name} value={e.name}>
                      {e.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ display: "flex", m: 3 }}>
                  <FormControl component='fieldset' variant='standard'>
                    <FormLabel component='legend'>
                      Select all that apply:
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={has_dogs}
                            onChange={handleInputChange}
                            name='has_dogs'
                          />
                        }
                        label='Own dogs'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={has_cats}
                            onChange={handleInputChange}
                            name='has_cats'
                          />
                        }
                        label='Own cats'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={smoke_free_home}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            name='has_small_children'
                          />
                        }
                        label='Have small children'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={residence_owned}
                            onChange={handleInputChange}
                            name='residence_owned'
                          />
                        }
                        label='Residence Owned'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={wants_prepproval}
                            onChange={handleInputChange}
                            name='wants_prepproval'
                          />
                        }
                        label='Get Pre-approved?'
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
                          onChange={handleInputChange}
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
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
