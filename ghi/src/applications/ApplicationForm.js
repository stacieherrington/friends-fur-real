import { useCallback } from "react";
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
  IconButton,
  Alert,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import SmokeFreeSharpIcon from "@mui/icons-material/SmokeFreeSharp";
import SmokingRoomsSharpIcon from "@mui/icons-material/SmokingRoomsSharp";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";
import CloseIcon from "@mui/icons-material/Close";

import { useAddApplicationMutation } from "../redux/api";
import Copyright from "../components/Copyright";
import { updateField, updateCheck } from "../redux/slices/applicationSlice";
import { preventDefault } from "../redux/utility";
import {
  APPLICATION_MODAL,
  closeModal,
  openModal,
} from "../redux/slices/modalSlice";
import ModalStyle from "../components/ModalStyle";
import Notification from "../redux/Notification";
import { clearForm } from "../redux/slices/applicationSlice";
const residences = [
  { name: "Single Family Home" },
  { name: "Single Family w/ large yard" },
  { name: "Apartment" },
  { name: "Townhouse" },
  { name: "Condo" },
];

export default function ApplicationForm(props) {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);
  const { pet_id, rescue_id } = props;
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

  const [application, { error, isSuccess, isError }] =
    useAddApplicationMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );
  const check = useCallback(
    (e) =>
      dispatch(
        updateCheck({ field: e.target.name, checked: e.target.checked })
      ),
    [dispatch]
  );
  const requiredError = agrees_to_terms === false || null;
  if (!isOpen && modalType === APPLICATION_MODAL) {
    dispatch(clearForm());
  }

  return (
    <>
      <Button
        onClick={() => {
          dispatch(openModal(APPLICATION_MODAL));
        }}
      >
        Adopt me!
      </Button>
      <Modal
        open={isOpen && modalType === APPLICATION_MODAL}
        onClose={() => {
          dispatch(closeModal());
          dispatch(clearForm());
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={ModalStyle}>
          <IconButton
            onClick={() => {
              dispatch(closeModal());
              dispatch(clearForm());
            }}
            sx={{ alignItems: "flex-end", mx: 1, my: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Container component='main'>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#294C60" }}>
                <PetsIcon />
              </Avatar>
              {isError ? (
                <Notification>
                  <Alert severity='error'>{error.data.detail}</Alert>
                </Notification>
              ) : null}
              <Typography component='h1' variant='h5'>
                Adoption Application Form
              </Typography>
              <Box
                component="form"
                onSubmit={preventDefault(application, () => {
                  if (!isError) {
                    dispatch(closeModal());
                  }

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
                    rescue_id: rescue_id,
                    pet_id: pet_id,
                    status,
                  };
                })}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={field}
                  value={first_name}
                  type="text"
                  name="first_name"
                  label="First Name"
                  autoComplete="current-first-name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={field}
                  value={last_name}
                  type="text"
                  name="last_name"
                  label="Last Name"
                  autoComplete="current-last-name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Address One"
                  onChange={field}
                  value={address_one}
                  type="text"
                  name="address_one"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Address Two"
                  onChange={field}
                  value={address_two}
                  type="text"
                  name="address_two"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="City"
                  onChange={field}
                  value={city}
                  type="text"
                  name="city"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="State"
                  onChange={field}
                  value={state}
                  type="text"
                  name="state"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Zip Code"
                  onChange={field}
                  value={zip_code}
                  type="text"
                  name="zip_code"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Phone Number"
                  onChange={field}
                  value={phone_number}
                  type="text"
                  name="phone_number"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={field}
                  value={date_ready}
                  name="date_ready"
                  type="date"
                  autoComplete="current-date"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={field}
                  value={landlord_restrictions}
                  multiline
                  maxRows={4}
                  name="landlord_restrictions"
                  label="Landlord Restrictions"
                  type="text"
                  autoComplete="current-landlord-restrictions"
                />

                <TextField
                  id="outlined-select-residence"
                  select
                  fullWidth
                  required
                  name='residence_type'
                  label='Residence Type'
                  onChange={field}
                  autoComplete='current-residence-type'
                  value={residence_type}
                >
                  {residences.map((e) => (
                    <MenuItem key={e.name} value={e.name}>
                      {e.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ display: "flex", m: 3 }}>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">
                      Select all that apply:
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={has_dogs}
                            onChange={check}
                            name='has_dogs'
                          />
                        }
                        label="Own dogs"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={has_cats}
                            onChange={check}
                            name='has_cats'
                          />
                        }
                        label="Own cats"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={smoke_free_home}
                            onChange={check}
                            name='smoke_free_home'
                            icon={<SmokingRoomsSharpIcon color='error' />}
                            checkedIcon={<SmokeFreeSharpIcon color='success' />}
                          />
                        }
                        label="Smoker?"
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">
                      <br></br>
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={has_small_children}
                            onChange={check}
                            name='has_small_children'
                          />
                        }
                        label="Have small children"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={residence_owned}
                            onChange={check}
                            name='residence_owned'
                          />
                        }
                        label="Residence Owned"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={wants_preapproval}
                            onChange={check}
                            name='wants_preapproval'
                          />
                        }
                        label="Get Pre-approved?"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box sx={{ m: 3 }}>
                  <FormControl
                    required
                    error={requiredError}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel>Required*</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checkedIcon={<DoneOutlineSharpIcon color='success' />}
                          checked={agrees_to_terms}
                          onChange={check}
                          name='agrees_to_terms'
                        />
                      }
                      label="I agree to the Terms and Conditions* *"
                    />
                  </FormControl>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
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
