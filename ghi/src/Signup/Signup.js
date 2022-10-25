import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";
import { useSignupMutation } from "../redux/api";
// import { useNavigate } from "react-router-dom";
import { updateField } from "../redux/slices/accountSlice";
import { preventDefault } from "../redux/utility";

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

export default function SignUpForm(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { email, password, zip_code } = useSelector((state) => state.account);
  const [signup, { error, isSuccess }] = useSignupMutation();

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  // if (isSuccess) {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 0);
  // }
  return (
    <>
      <ThemeProvider theme={theme}>
        {props.appBar ? (
          <Button sx={{ color: "#fff" }} onClick={handleOpen}>
            Signup
          </Button>
        ) : (
          <Button onClick={handleOpen}>
            {"Don't have an account? Sign Up"}
          </Button>
        )}
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
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Sign up
                </Typography>
                <Box
                  component='form'
                  onSubmit={preventDefault(signup, () => {
                    handleClose();
                    return {
                      email,
                      password,
                      address: { zip_code },
                    };
                  })}
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
                  {/* <Grid container justifyContent='flex-end'>
                    <Grid item>
                      <Link href='/login' variant='body2'>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid> */}
                </Box>
              </Box>
              <Copyright sx={{ mt: 10 }} />
            </Container>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
}
