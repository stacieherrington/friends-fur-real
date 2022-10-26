import { useState } from "react";
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
import { useLoginMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../Signup/Signup";

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

export default function LoginForm(props) {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [login, { error }] = useLoginMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(event.target);
    if (error) {
      alert('INCORRECT CREDENTIALS');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {props.petCard ? (
        <Button onClick={handleOpen}>Adopt me!</Button>
      ) : props.signUp ? (
        <Button onClick={handleOpen}>Already have an account? Sign in!</Button>
      ) : (
        <Button sx={{ color: "#fff" }} onClick={handleOpen}>
          Login
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
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
                Sign in
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
                  Sign In
                </Button>

                <SignUpForm />
              </Box>
            </Box>
            <Copyright sx={{ mt: 10, mb: 4 }} />
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
