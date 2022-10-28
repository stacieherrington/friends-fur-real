import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Modal,
  Typography,
  Container,
  IconButton,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

import Copyright from "../components/Copyright";
import ModalStyle from "../components/ModalStyle";
import Notification from "../redux/Notification";
import { useLoginMutation } from "../redux/api";
import {
  SIGNUP_MODAL,
  openModal,
  closeModal,
  LOGIN_MODAL,
} from "../redux/slices/modalSlice";
import { clearForm } from "../redux/slices/accountSlice";
export default function LoginForm() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);
  const [login, { error }] = useLoginMutation();

  return (
    <>
      <Modal
        open={isOpen && modalType === LOGIN_MODAL}
        onClose={() => {
          dispatch(closeModal());
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={ModalStyle}>
          <IconButton
            onClick={() => {
              dispatch(closeModal(), clearForm());
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
                Login
              </Typography>

              {error ? (
                <Notification>
                  <Alert severity='error'>{error.data.detail}</Alert>
                </Notification>
              ) : null}
              <Box
                component='form'
                onSubmit={(event) => {
                  event.preventDefault();
                  login(event.target);
                  if (!error) {
                    dispatch(closeModal());
                  }
                }}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
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
                  Login
                </Button>

                <Button
                  onClick={() => {
                    closeModal();
                    dispatch(openModal(SIGNUP_MODAL));
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 16 }} />
          </Container>
        </Box>
      </Modal>
    </>
  );
}
