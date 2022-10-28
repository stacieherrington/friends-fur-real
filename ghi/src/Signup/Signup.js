import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Modal,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Copyright from "../components/Copyright";
import { useSignupMutation } from "../redux/api";
import { updateField } from "../redux/slices/accountSlice";
import { preventDefault } from "../redux/utility";
import ModalStyle from "../components/ModalStyle";
import Notification from "../redux/Notification";

import {
  SIGNUP_MODAL,
  closeModal,
  openModal,
  LOGIN_MODAL,
} from "../redux/slices/modalSlice";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);
  const { email, password, zip_code } = useSelector((state) => state.account);
  const [signup, { error, isSuccess }] = useSignupMutation();

  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  return (
    <>
      <Modal
        open={isOpen && modalType === SIGNUP_MODAL}
        onClose={() => {
          dispatch(closeModal());
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={ModalStyle}>
          <IconButton
            onClick={() => {
              dispatch(closeModal());
            }}
            sx={{ alignItems: "flex-end", mx: 1, my: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
              sx={{
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
              {!error ? (
                <Notification type='danger'>{error}</Notification>
              ) : null}
              <Box
                component='form'
                onSubmit={preventDefault(signup, () => {
                  dispatch(closeModal());
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
                    <Button
                      onClick={() => {
                        dispatch(openModal(LOGIN_MODAL));
                      }}
                    >
                      Already have an account? Sign in!
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 6 }} />
          </Container>
        </Box>
      </Modal>
    </>
  );
}
