import { useState } from "react";
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
  Grid,
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

import { useAddFosterApplicationMutation } from "../redux/api";
import Copyright from "../components/Copyright";
// import {
//   updateField,
//   updateCheck,
// } from "../redux/slices/fosterApplicationSlice";
import { preventDefault } from "../redux/utility";
import {
  FOSTER_APPLICATION_MODAL,
  closeModal,
  openModal,
} from "../redux/slices/modalSlice";
import ModalStyle from "../components/ModalStyle";
import Notification from "../redux/Notification";
import { clearForm } from "../redux/slices/fosterApplicationSlice";
import { FieldMap } from "../components/FosterFields";
const residences = [
  { name: "Single Family Home" },
  { name: "Single Family w/ large yard" },
  { name: "Apartment" },
  { name: "Townhouse" },
  { name: "Condo" },
];
export default function FosterApplicationForm(props) {
  ModalStyle.width = "100vw";
  ModalStyle.maxWidth = "95vw";
  ModalStyle.height = "95vh";

  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state) => state.modal);
  const { rescue_id } = props;
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address_one: "",
    address_two: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    age: "",
    date_submitted: "",
    drivers_license_state: "",
    primary_caregiver: "",
    residence_type: "",
    landlord_name: "",
    landlord_phone: "",
    landlord_restrictions: "",
    yard_description: "",
    fence_type: "",
    fence_area: "",
    fence_height: "",
    pet_capacity: "",
    number_household_adults: "",
    number_household_children: "",
    household_children_ages: "",
    all_pets: "",
    how_many_neutered: "",
    where_pets_now: "",
    previous_adoption_from: "",
    reason_forfiture: "",
    if_not_spayed: "",
    current_vet_name: "",
    current_vet_phone: "",
    reference_names: "",
    reference_phone: "",
    preferred_animal: "",
    prev_foster_program: "",
    dog_puppy_exp: "",
    cat_kitten_exp: "",
    daily_foster_alone_hours: "",
    foster_care: "",
    foster_sleep: "",
    foster_time: "",
    time_limit: "",
    reason_to_foster: "",
    household_allergies: false,
    residence_owned: false,
    smoke_free_home: true,
    fenced_yard: false,
    underground_fence: false,
    kennel: false,
    dog_run: false,
    has_dogs: false,
    has_small_children: false,
    has_cats: false,
    previous_adopter: false,
    pet_forfiture: false,
    spayed_neutered: false,
    previously_fostered: false,
    seperate_animals: false,
    transport_foster: false,
    home_visit: false,
    agrees_to_terms: false,
    wants_preapproval: false,
    rescue_id: rescue_id,
    status: "Submitted",
  });

  const [fosterApplication, { error, isError }] =
    useAddFosterApplicationMutation();
  const updateField = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const updateCheck = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({
      first_name: "",
      last_name: "",
      address_one: "",
      address_two: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      age: "",
      date_submitted: "",
      drivers_license_state: "",
      primary_caregiver: "",
      residence_type: "",
      landlord_name: "",
      landlord_phone: "",
      landlord_restrictions: "",
      yard_description: "",
      fence_type: "",
      fence_area: "",
      fence_height: "",
      pet_capacity: "",
      number_household_adults: "",
      number_household_children: "",
      household_children_ages: "",
      all_pets: "",
      how_many_neutered: "",
      where_pets_now: "",
      previous_adoption_from: "",
      reason_forfiture: "",
      if_not_spayed: "",
      current_vet_name: "",
      current_vet_phone: "",
      reference_names: "",
      reference_phone: "",
      preferred_animal: "",
      prev_foster_program: "",
      dog_puppy_exp: "",
      cat_kitten_exp: "",
      daily_foster_alone_hours: "",
      foster_care: "",
      foster_sleep: "",
      foster_time: "",
      time_limit: "",
      reason_to_foster: "",
      household_allergies: false,
      residence_owned: false,
      smoke_free_home: true,
      fenced_yard: false,
      underground_fence: false,
      kennel: false,
      dog_run: false,
      has_dogs: false,
      has_small_children: false,
      has_cats: false,
      previous_adopter: false,
      pet_forfiture: false,
      spayed_neutered: false,
      previously_fostered: false,
      seperate_animals: false,
      transport_foster: false,
      home_visit: false,
      agrees_to_terms: false,
      wants_preapproval: false,
      rescue_id: rescue_id,
      status: "Submitted",
    });
  };
  const requiredError = form.agrees_to_terms === false || null;
  if (!isOpen && modalType === FOSTER_APPLICATION_MODAL) {
    dispatch(clearForm());
  }
  const FieldMap = ({ form, setForm }) => {
    Object.keys(form).map((field, index) => {
      return (
        <Grid item xs={6}>
          <TextField
            key={index}
            margin='normal'
            required
            fullWidth
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            value={form[field]}
            type='text'
            name={field}
            label={field}
            autoComplete='current-first-name'
            autoFocus
          />
        </Grid>
      );
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          dispatch(openModal(FOSTER_APPLICATION_MODAL));
        }}
      >
        Fostering me!!
      </Button>
      <Modal
        open={isOpen && modalType === FOSTER_APPLICATION_MODAL}
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
            sx={{ alignItems: "flex-end" }}
          >
            <CloseIcon sx={{ fontSize: 30 }} />
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
                Foster Application Form
              </Typography>
              <Box
                component='form'
                onSubmit={preventDefault(fosterApplication, () => {
                  if (!isError) {
                    handleSubmit();

                    dispatch(closeModal());
                  }
                })}
              >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <FieldMap form={form} setForm={setForm} />
                  <Grid item xs={6}>
                    First Name
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      onChange={updateField}
                      value={form.first_name}
                      type='text'
                      name='first_name'
                      label='First Name'
                      autoComplete='current-first-name'
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={6}>
                    Last Name
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      onChange={updateField}
                      value={form.last_name}
                      type='text'
                      name='last_name'
                      label='Last Name'
                      autoComplete='current-last-name'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Address One'
                      onChange={updateField}
                      value={form.address_one}
                      type='text'
                      name='address_one'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Address Two'
                      onChange={updateField}
                      value={form.address_two}
                      type='text'
                      name='address_two'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='City'
                      onChange={updateField}
                      value={form.city}
                      type='text'
                      name='city'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='State'
                      onChange={updateField}
                      value={form.state}
                      type='text'
                      name='state'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Zip Code'
                      onChange={updateField}
                      value={form.zip_code}
                      type='text'
                      name='zip_code'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Phone Number'
                      onChange={updateField}
                      value={form.phone_number}
                      type='text'
                      name='phone_number'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      onChange={updateField}
                      value={form.date_submitted}
                      name='date_submitted'
                      type='date'
                      autoComplete='current-date'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Drivers License State'
                      onChange={updateField}
                      value={form.drivers_license_state}
                      type='text'
                      name='drivers_license_state'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Primary Caregiver'
                      onChange={updateField}
                      value={form.primary_caregiver}
                      type='text'
                      name='primary_caregiver'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Landlord Name'
                      onChange={updateField}
                      value={form.landlord_name}
                      type='text'
                      name='landlord_name'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Landlord Phone'
                      onChange={updateField}
                      value={form.landlord_phone}
                      type='text'
                      name='landlord_phone'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      fullWidth
                      onChange={updateField}
                      value={form.landlord_restrictions}
                      multiline
                      maxRows={4}
                      name='landlord_restrictions'
                      label='Landlord Restrictions'
                      type='text'
                      autoComplete='current-landlord-restrictions'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      fullWidth
                      onChange={updateField}
                      value={form.yard_description}
                      multiline
                      maxRows={4}
                      name='yard_description'
                      label='Yard Description'
                      type='text'
                      autoComplete='current-yard-description'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Fence Type'
                      onChange={updateField}
                      value={form.fence_type}
                      type='text'
                      name='fence_type'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Fence Area'
                      onChange={updateField}
                      value={form.fence_area}
                      type='text'
                      name='fence_area'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Fence Height'
                      onChange={updateField}
                      value={form.fence_height}
                      type='text'
                      name='fence_height'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Pet Capacity'
                      onChange={updateField}
                      value={form.pet_capacity}
                      type='text'
                      name='pet_capacity'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Number of Adults in Household?'
                      onChange={updateField}
                      value={form.number_household_adults}
                      type='text'
                      name='number_household_adults'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Number of Children in Household?'
                      onChange={updateField}
                      value={form.number_household_children}
                      type='text'
                      name='number_household_children'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Age of Children in Household?'
                      onChange={updateField}
                      value={form.household_children_ages}
                      type='text'
                      name='household_children_ages'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      fullWidth
                      onChange={updateField}
                      value={form.all_pets}
                      multiline
                      maxRows={4}
                      name='all_pets'
                      label='List all Pets'
                      type='text'
                      autoComplete='current-all-pets'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='How many pets are neutered?'
                      onChange={updateField}
                      value={form.how_many_neutered}
                      type='text'
                      name='how_many_neutered'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Where are your previous fosters now?'
                      onChange={updateField}
                      value={form.where_pets_now}
                      type='text'
                      name='where_pets_now'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Where are your previous fosters from?'
                      multiline
                      maxRows={4}
                      onChange={updateField}
                      value={form.previous_adoption_from}
                      type='text'
                      name='previous_adoption_from'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='If not spayed/neutered, why?'
                      onChange={updateField}
                      value={form.if_not_spayed}
                      type='text'
                      name='if_not_spayed'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Current Vet Name?'
                      onChange={updateField}
                      value={form.current_vet_name}
                      type='text'
                      name='current_vet_name'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Current Vet Phone?'
                      onChange={updateField}
                      value={form.current_vet_phone}
                      type='text'
                      name='current_vet_phone'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Reference Phone Numbers:'
                      onChange={updateField}
                      value={form.reference_phone}
                      type='text'
                      name='reference_phone'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='Please list 3 referenes:'
                      onChange={updateField}
                      value={form.reference_names}
                      type='text'
                      name='reference_names'
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='What type of animal preferences do you have?'
                      onChange={updateField}
                      value={form.preferred_animal}
                      type='text'
                      name='preferred_animal'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='How much experience do you have with dogs & puppies?'
                      onChange={updateField}
                      value={form.dog_puppy_exp}
                      type='text'
                      name='dog_puppy_exp'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      label='How much experience do you have with cats & kittens?'
                      onChange={updateField}
                      value={form.cat_kitten_exp}
                      type='text'
                      name='cat_kitten_exp'
                    />
                  </Grid>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Who have you previously fostered for?'
                    onChange={updateField}
                    value={form.prev_foster_program}
                    type='text'
                    name='prev_foster_program'
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='How many hours per day will fosters be alone?'
                    onChange={updateField}
                    value={form.daily_foster_alone_hours}
                    type='text'
                    name='daily_foster_alone_hours'
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Where will the foster stay when you are at work or not home?'
                    onChange={updateField}
                    value={form.foster_care}
                    type='text'
                    name='foster_care'
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Where will the foster sleep at night?'
                    onChange={updateField}
                    value={form.foster_sleep}
                    type='text'
                    name='foster_sleep'
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='What is the maximum time you can foster?'
                    onChange={updateField}
                    value={form.foster_time}
                    type='text'
                    name='foster_time'
                  />
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    label='Why do you want to be a foster?'
                    multiline
                    maxRows={4}
                    onChange={updateField}
                    value={form.reason_to_foster}
                    type='text'
                    name='reason_to_foster'
                  />
                  <Grid item xs={4}>
                    <TextField
                      id='outlined-select-residence'
                      select
                      fullWidth
                      required
                      name='residence_type'
                      label='Residence Type'
                      onChange={updateField}
                      autoComplete='current-residence-type'
                      value={form.residence_type}
                    >
                      {residences.map((e) => (
                        <MenuItem key={e.name} value={e.name}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Box sx={{ display: "flex", m: 3 }}>
                    <FormControl component='fieldset' variant='standard'>
                      <FormLabel component='legend'>
                        Select all that apply:
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.has_dogs}
                              onChange={updateCheck}
                              name='has_dogs'
                            />
                          }
                          label='Own dogs'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.has_cats}
                              onChange={updateCheck}
                              name='has_cats'
                            />
                          }
                          label='Own cats'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.smoke_free_home}
                              onChange={updateCheck}
                              name='smoke_free_home'
                              icon={<SmokingRoomsSharpIcon color='error' />}
                              checkedIcon={
                                <SmokeFreeSharpIcon color='success' />
                              }
                            />
                          }
                          label='Smoker?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.residence_owned}
                              onChange={updateCheck}
                              name='residence_owned'
                            />
                          }
                          label='Residence Owned?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.transport_foster}
                              onChange={updateCheck}
                              name='transport_foster'
                            />
                          }
                          label='Can you transport your foster to and from?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.previous_adopter}
                              onChange={updateCheck}
                              name='previous_adopter'
                            />
                          }
                          label='Are you a previous adopter?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.previously_fostered}
                              onChange={updateCheck}
                              name='previously_fostered'
                            />
                          }
                          label='Are you a previous foster?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.home_visit}
                              onChange={updateCheck}
                              name='home_visit'
                            />
                          }
                          label='Are you okay if we do a home visit?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.seperate_animals}
                              onChange={updateCheck}
                              name='seperate_animals'
                            />
                          }
                          label='Can you keep fosters separate from your own animals?'
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
                              checked={form.has_small_children}
                              onChange={updateCheck}
                              name='has_small_children'
                            />
                          }
                          label='Have small children'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.residence_owned}
                              onChange={updateCheck}
                              name='residence_owned'
                            />
                          }
                          label='Residence Owned'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.wants_preapproval}
                              onChange={updateCheck}
                              name='wants_preapproval'
                            />
                          }
                          label='Get Pre-approved?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.underground_fence}
                              onChange={updateCheck}
                              name='underground_fence'
                            />
                          }
                          label='Underground Fence?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.kennel}
                              onChange={updateCheck}
                              name='kennel'
                            />
                          }
                          label='Kennel?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.dog_run}
                              onChange={updateCheck}
                              name='dog_run'
                            />
                          }
                          label='Dog Run?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.pet_forfiture}
                              onChange={updateCheck}
                              name='pet_forfiture'
                            />
                          }
                          label='Are you a previous adopter?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.spayed_neutered}
                              onChange={updateCheck}
                              name='spayed_neutered'
                            />
                          }
                          label='Are all of your pets spayed / neutered?'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={form.fenced_yard}
                              onChange={updateCheck}
                              name='fenced_yard'
                            />
                          }
                          label='Fenced Yard?'
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
                            checkedIcon={
                              <DoneOutlineSharpIcon color='success' />
                            }
                            checked={form.agrees_to_terms}
                            onChange={updateCheck}
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
                    variant='contained'
                    sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }}
                    endIcon={<PetsIcon />}
                  >
                    Submit
                  </Button>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 10, mb: 4 }} />
          </Container>
        </Box>
      </Modal>
    </>
  );
}
