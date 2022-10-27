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
import Copyright from "../components/Copyright";
import { useSignupMutation } from "../redux/api";
import { updateField } from "../redux/slices/accountSlice";
import { preventDefault } from "../redux/utility";
import LoginForm from "../Login/Login";

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
  const [sign, setSign] = useState(false);
  const signOpen = () => setSign(true);
  const signClosed = () => setSign(false);
  const { email, password, zip_code } = useSelector((state) => state.account);
  const [signup, { error, isSuccess }] = useSignupMutation();

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  return (
    <>
      {props.appBar ? (
        <Button sx={{ color: "#fff" }} onClick={signOpen}>
          Signup
        </Button>
      ) : props.burger ? (
        <Box sx={{ mx: "auto" }} onClick={signOpen}>
          Signup
        </Box>
      ) : (
        <Button onClick={signOpen}>{"Don't have an account? Sign Up"}</Button>
      )}
      <Modal
        open={sign}
        onClose={signClosed}
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
                  signClosed();
                  return {
                    email,
                    password,
                    address: {
                      address_one: "",
                      address_two: "",
                      city: "",
                      state: "",
                      zip_code,
                    },
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
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link variant='body2'>
                      <LoginForm onClick={signClosed} signUp={"signUp"} />
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 10 }} />
          </Container>
        </Box>
      </Modal>
    </>
  );
}
