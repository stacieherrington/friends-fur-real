import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Box,
  Modal,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import Copyright from "../components/Copyright";
import {
  useSingleAccountQuery,
  usePatchUpdateAccountMutation,
} from "../redux/api";
import { preventDefault } from "../redux/utility";
import PetsIcon from '@mui/icons-material/Pets';


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

export default function UpdateAccountForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useSingleAccountQuery();

  const [updateAcc, { error, isLoading, isSuccess }] =
    usePatchUpdateAccountMutation(data);

  const [first_name, setFirst] = useState(data.first_name);
  const [last_name, setLast] = useState(data.last_name);
  const [address_one, setAddOne] = useState(data.address.address_one);
  const [address_two, setAddTwo] = useState(data.address.address_two);
  const [city, setCity] = useState(data.address.city);
  const [state, setState] = useState(data.address.state);
  const [zip_code, setZip] = useState(data.address.zip_code);
  const [picture, setPicture] = useState(data.picture);
  const [about_me, setAbout] = useState(data.about_me);

  const firstChange = (e) => setFirst(e.target.value);
  const lastChange = (e) => setLast(e.target.value);
  const addOneChange = (e) => setAddOne(e.target.value);
  const addTwoChange = (e) => setAddTwo(e.target.value);
  const cityChange = (e) => setCity(e.target.value);
  const stateChange = (e) => setState(e.target.value);
  const zipChange = (e) => setZip(e.target.value);
  const pictureChange = (e) => setPicture(e.target.value);
  const aboutChange = (e) => setAbout(e.target.value);

  return (
    <>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Button onClick={handleOpen}>Update Account</Button>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onBackdropClick={handleClose}
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
              <Avatar sx={{ m: 1, bgcolor: "#294C60" }}>
                <PetsIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Update Account
              </Typography>
              <Box
                component='form'
                onSubmit={preventDefault(updateAcc, () => {
                  handleClose();
                  return {
                    first_name,
                    last_name,
                    picture,
                    address: {
                      address_one,
                      address_two,
                      city,
                      state,
                      zip_code,
                    },
                    about_me,
                  };
                })}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      onChange={firstChange}
                      value={first_name ? first_name : ""}
                      type='text'
                      name='first_name'
                      label='First Name'
                      autoComplete='current-first-name'
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      onChange={lastChange}
                      value={last_name ? last_name : ""}
                      type='text'
                      name='last_name'
                      label='Last Name'
                      autoComplete='current-last-name'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Address One'
                      onChange={addOneChange}
                      value={
                        address_one === "string"
                          ? ""
                          : address_one
                          ? address_one
                          : ""
                      }
                      type='text'
                      name='address_one'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Address Two'
                      onChange={addTwoChange}
                      value={
                        address_two === "string"
                          ? ""
                          : address_one
                          ? address_one
                          : ""
                      }
                      type='text'
                      name='address_two'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='City'
                      onChange={cityChange}
                      value={city === "string" ? "" : city ? city : ""}
                      type='text'
                      name='city'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='State'
                      onChange={stateChange}
                      value={state === "string" ? "" : state ? state : ""}
                      type='text'
                      name='state'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Zip Code'
                      onChange={zipChange}
                      value={
                        zip_code === "string" ? "" : zip_code ? zip_code : ""
                      }
                      type='text'
                      name='zip_code'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Picture URL'
                      onChange={pictureChange}
                      value={picture === "string" ? "" : picture ? picture : ""}
                      type='text'
                      name='picture'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Write a little about yourself!'
                      onChange={aboutChange}
                      value={
                        about_me === "string" ? "" : about_me ? about_me : ""
                      }
                      multiline
                      maxRows={8}
                      type='text'
                      name='about_me'
                    />
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }}

                  endIcon={<PetsIcon />}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 10, mb: 4 }} />
          </Container>
        </Box>
      </Modal>
    </>
  );
}
