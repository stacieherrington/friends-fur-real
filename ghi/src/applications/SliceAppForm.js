import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  MenuItem,
  Typography,
  Container,
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import SmokeFreeSharpIcon from "@mui/icons-material/SmokeFreeSharp";
import SmokingRoomsSharpIcon from "@mui/icons-material/SmokingRoomsSharp";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";

import { useAddApplicationMutation, useGetTokenQuery } from "../redux/api";
import Copyright from "../components/Copyright";
import { updateField } from "../redux/slices/applicationSlice";
import { preventDefault } from "../redux/utility";
import Login from "../Login/Login";

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
const residences = [
  { name: "Single Family Home" },
  { name: "Single Family w/ large yard" },
  { name: "Apartment" },
  { name: "Townhouse" },
  { name: "Condo" },
];

export default function ApplicationForm(props) {
  const {
    data: token,
    error,
    isSuccess: tokenSuccess,
    isLoading,
  } = useGetTokenQuery();
  const { pet_id, rescue_id } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
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
    wants_preapproval,
    agrees_to_terms,
    residence_owned,
    status,
  } = useSelector((state) => state.application);
  const [application, { isSuccess }] = useAddApplicationMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const requiredError = [agrees_to_terms].filter((v) => v).length < 1;

  return (
    <ThemeProvider theme={theme}>
      {token ? (
        <Button onClick={handleOpen}>Adopt me!</Button>
      ) : (
        <Login petCard='petCard' />
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
                Adoption Application Form
              </Typography>
              <Box
                component='form'
                onSubmit={preventDefault(application, () => {
                  handleClose();
                  return {
                    first_name,
                    last_name,
                    address: {
                      address_one,
                      address_two,
                      city,
                      state,
                      zip_code,
                    },
                    phone_number,
                    date_ready,
                    landlord_restrictions,
                    residence_type,
                    has_small_children,
                    smoke_free_home,
                    has_dogs,
                    has_cats,
                    wants_preapproval,
                    agrees_to_terms,
                    residence_owned,
                    pet_id: pet_id,
                    rescue_id: rescue_id,
                    status,
                  };
                })}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={field}
                  value={first_name}
                  type='text'
                  name='first_name'
                  label='First Name'
                  autoComplete='current-first-name'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={field}
                  value={last_name}
                  type='text'
                  name='last_name'
                  label='Last Name'
                  autoComplete='current-last-name'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Address One'
                  onChange={field}
                  value={address_one}
                  type='text'
                  name='address_one'
                />
                <TextField
                  margin='normal'
                  fullWidth
                  label='Address Two'
                  onChange={field}
                  value={address_two}
                  type='text'
                  name='address_two'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='City'
                  onChange={field}
                  value={city}
                  type='text'
                  name='city'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='State'
                  onChange={field}
                  value={state}
                  type='text'
                  name='state'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Zip Code'
                  onChange={field}
                  value={zip_code}
                  type='text'
                  name='zip_code'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Phone Number'
                  onChange={field}
                  value={phone_number}
                  type='text'
                  name='phone_number'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  onChange={field}
                  value={date_ready}
                  name='date_ready'
                  type='date'
                  autoComplete='current-date'
                />
                <TextField
                  margin='normal'
                  fullWidth
                  onChange={field}
                  value={landlord_restrictions}
                  multiline
                  maxRows={4}
                  name='landlord_restrictions'
                  label='Landlord Restrictions'
                  type='text'
                  autoComplete='current-landlord-restrictions'
                />

                <TextField
                  id='outlined-select-residence'
                  select
                  fullWidth
                  name='residence_type'
                  label='Residence Type'
                  onChange={field}
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
                            value={has_dogs}
                            onChange={field}
                            name='has_dogs'
                          />
                        }
                        label='Own dogs'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={has_cats}
                            onChange={field}
                            name='has_cats'
                          />
                        }
                        label='Own cats'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={smoke_free_home}
                            defaultChecked
                            onChange={field}
                            name='smoke_free_home'
                            icon={<SmokingRoomsSharpIcon color='error' />}
                            checkedIcon={<SmokeFreeSharpIcon color='success' />}
                          />
                        }
                        label='Smoker?'
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
                            value={has_small_children}
                            onChange={field}
                            name='has_small_children'
                          />
                        }
                        label='Have small children'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={residence_owned}
                            onChange={field}
                            name='residence_owned'
                          />
                        }
                        label='Residence Owned'
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={wants_preapproval}
                            onChange={field}
                            name='wants_preapproval'
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
                    error={requiredError}
                    component='fieldset'
                    variant='standard'
                  >
                    <FormLabel>Required*</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checkedIcon={<DoneOutlineSharpIcon color='success' />}
                          value={agrees_to_terms}
                          onChange={field}
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
