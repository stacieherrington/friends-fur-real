import * as React from "react";
import {useState} from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { MuiTelInput } from "mui-tel-input";
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import AppCheckbox from './appCheckbox'

// function Checkbox2() {
//   const [hasChildren, setHasChildren] = useState(false)
//   const handleBoxChange = () => {
//     setHasChildren(true)
//   }
//   console.log(hasChildren)
//   return (
//     <FormGroup>
//       <Grid>
//       <FormControlLabel control={<Checkbox />} value={hasChildren} onChange={handleBoxChange} label="Small children" />
//       <FormControlLabel control={<Checkbox />} label="Dogs" />
//       <FormControlLabel control={<Checkbox />} label="Cats" />
//       <FormControlLabel control={<Checkbox />} label="Request pre-approval" />
//       <FormControlLabel control={<Checkbox />} label="Agree to terms" />
//       </Grid>
//     </FormGroup>
//   );
// }

// function CheckboxesGroup() {
//   const [state, setState] = React.useState({
//     children: false,
//      dogs: false, 
//      cats: false, 
//      preApproval: false, 
//      terms:false})
  
//   const handleCheckChange = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.checked,
//     });
//   };
//   const error = [children, dogs, cats, preApproval, terms ].filter((v) => v).length !== 2;
// }
  

function PhoneNumber() {
  const [phone, setPhone] = useState("");

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  return (
    <MuiTelInput
      value={phone}
      placeholder='Phone Number'
      onlyCountries={["US"]}
      onChange={handleChange}
    />
  );
}

const theme = createTheme();

export default function ApplicationForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
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
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              placeholder='First Name'
              name='firstName'
              autoComplete='current-firstname'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='lastName'
              placeholder='Last Name'
              type='text'
              id='lastName'
              autoComplete='current-lastname'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='address'
              placeholder='Address'
              type='text'
              id='address'
              autoComplete='current-address'
            />
            <PhoneNumber />
            <AppCheckbox/>




            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              color='primary'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 10, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
