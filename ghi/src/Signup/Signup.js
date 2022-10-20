import * as React from "react";
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
import { useSignupMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/accountSlice";
import { preventDefault } from "../redux/utility";

const theme = createTheme();

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, zip_code } = useSelector((state) => state.account);
  const [signup, { error, isSuccess }] = useSignupMutation();

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 0);
  }
  return (
    <>
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
              Sign up
            </Typography>
            <Box
              component='form'
              onSubmit={preventDefault(signup, () => ({
                email,
                password,
                address: { zip_code },
              }))}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label='Email Address'
                    name='email'
                    onChange={field}
                    value={email}
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    onChange={field}
                    value={password}
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    onChange={field}
                    value={zip_code}
                    label='Zip Code'
                    name='zip_code'
                    autoComplete='zip-code'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 10 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Copyright from "../components/Copyright";
// import { useSignupMutation } from "../redux/api";
// import { useNavigate } from "react-router-dom";
// import {useCallback} from 'react'
// import {useDispatch, useSelector } from 'react-redux'
// import {updateField} from "../redux/accountSlice"
// import {preventDefault} from "../redux/utility"

// const theme = createTheme();

// export default function SignUpForm() {
//   const navigate = useNavigate();
//   const [signup, { error, isLoading: signupLoading, data: signupData }] =
//     useSignupMutation();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     signup(e.target);
//   };
//   if (signupData) {
//     setTimeout(() => {
//       navigate("/");
//     }, 0);
//   }

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <Container component='main' maxWidth='xs'>
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "#CFE0FB" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component='h1' variant='h5'>
//               Sign up
//             </Typography>
//             <Box
//               component='form'
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id='email'
//                     label='Email Address'
//                     name='email'
//                     autoComplete='email'
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name='password'
//                     label='Password'
//                     type='password'
//                     id='password'
//                     autoComplete='new-password'
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id='zip_code'
//                     label='Zip Code'
//                     name='zip_code'
//                     autoComplete='zip-code'
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type='submit'
//                 fullWidth
//                 variant='contained'
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent='flex-end'>
//                 <Grid item>
//                   <Link href='/login' variant='body2'>
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 10 }} />
//         </Container>
//       </ThemeProvider>
//     </>
//   );
// }
