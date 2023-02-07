import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, CssBaseline, TextField, MenuItem, Typography, Container, Box, Grid, FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, Modal, IconButton, Alert } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import SmokeFreeSharpIcon from "@mui/icons-material/SmokeFreeSharp";
import SmokingRoomsSharpIcon from "@mui/icons-material/SmokingRoomsSharp";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";
import CloseIcon from "@mui/icons-material/Close";

import { useAddFosterApplicationMutation } from "../redux/api";
import Copyright from "../components/Copyright";
import { updateField, updateCheck } from "../redux/slices/fosterApplicationSlice";
import { preventDefault } from "../redux/utility";
import { FOSTER_APPLICATION_MODAL, closeModal, openModal } from "../redux/slices/modalSlice";
import ModalStyle from "../components/ModalStyle";
import Notification from "../redux/Notification";
import { clearForm } from "../redux/slices/fosterApplicationSlice";

const residences = [{ name: "Single Family Home" }, { name: "Single Family w/ large yard" }, { name: "Apartment" }, { name: "Townhouse" }, { name: "Condo" }];
export default function FosterApplicationForm(props) {
  ModalStyle.width = "100vw";
  ModalStyle.maxWidth = "95vw";
  ModalStyle.height = "95vh";
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
    age,
    date_submitted,
    drivers_license_state,
    primary_caregiver,
    residence_type,
    residence_owned,
    landlord_name,
    landlord_phone,
    landlord_restrictions,
    smoke_free_home,
    yard_description,
    fenced_yard,
    fence_type,
    fence_area,
    fence_height,
    pet_capacity,
    underground_fence,
    kennel,
    dog_run,
    has_dogs,
    has_small_children,
    has_cats,
    number_household_adults,
    number_household_children,
    household_children_ages,
    household_allergies,
    all_pets,
    how_many_neutered,
    where_pets_now,
    previous_adopter,
    previous_adoption_from,
    pet_forfiture,
    reason_forfiture,
    spayed_neutered,
    if_not_spayed,
    current_vet_name,
    current_vet_phone,
    reference_names,
    reference_phone,
    preferred_animal,
    previously_fostered,
    prev_foster_program,
    dog_puppy_exp,
    cat_kitten_exp,
    seperate_animals,
    daily_foster_alone_hours,
    foster_care,
    foster_sleep,
    foster_time,
    time_limit,
    transport_foster,
    home_visit,
    reason_to_foster,
    agrees_to_terms,
    wants_preapproval,
  } = useSelector((state) => state.fosterApplication);

  const [fosterApplication, { error, isError }] = useAddFosterApplicationMutation();
  const field = useCallback((e) => dispatch(updateField({ field: e.target.name, value: e.target.value })), [dispatch]);
  const check = useCallback((e) => dispatch(updateCheck({ field: e.target.name, checked: e.target.checked })), [dispatch]);
  const requiredError = agrees_to_terms === false || null;
  if (!isOpen && modalType === FOSTER_APPLICATION_MODAL) {
    dispatch(clearForm());
  }

  return (
    <>
      <Button
        onClick={() => {
          dispatch(openModal(FOSTER_APPLICATION_MODAL));
        }}
      >
        Foster me!
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
                Foster Application Form
              </Typography>
              <Box
                component='form'
                onSubmit={preventDefault(fosterApplication, () => {
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
                    age,
                    date_submitted,
                    drivers_license_state,
                    household_info: {
                      primary_caregiver,
                      residence_type,
                      residence_owned,
                      landlord_name,
                      landlord_phone,
                      landlord_restrictions,
                      smoke_free_home,
                      yard_description,
                      fenced_yard,
                      fence_type,
                      fence_area,
                      fence_height,
                      pet_capacity,
                      underground_fence,
                      kennel,
                      dog_run,
                      has_dogs,
                      has_small_children,
                      has_cats,
                      number_household_adults,
                      number_household_children,
                      household_children_ages,
                      household_allergies,
                    },
                    past_pets: {
                      all_pets,
                      how_many_neutered,
                      where_pets_now,
                      previous_adopter,
                      previous_adoption_from,
                      pet_forfiture,
                      reason_forfiture,
                      spayed_neutered,
                      if_not_spayed,
                      current_vet_name,
                      current_vet_phone,
                    },
                    reference_names,
                    reference_phone,
                    preferred_animal,
                    previously_fostered,
                    prev_foster_program,
                    dog_puppy_exp,
                    cat_kitten_exp,
                    seperate_animals,
                    daily_foster_alone_hours,
                    foster_care,
                    foster_sleep,
                    foster_time,
                    time_limit,
                    transport_foster,
                    home_visit,
                    reason_to_foster,
                    agrees_to_terms,
                    wants_preapproval,
                    rescue_id: rescue_id,
                    pet_id: pet_id,
                  };
                })}
              >
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth onChange={field} value={first_name} type='text' name='first_name' label='First Name' autoComplete='current-first-name' autoFocus />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth onChange={field} value={last_name} type='text' name='last_name' label='Last Name' autoComplete='current-last-name' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth label='Address One' onChange={field} value={address_one} type='text' name='address_one' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' fullWidth label='Address Two' onChange={field} value={address_two} type='text' name='address_two' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='City' onChange={field} value={city} type='text' name='city' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='State' onChange={field} value={state} type='text' name='state' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Zip Code' onChange={field} value={zip_code} type='text' name='zip_code' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Phone Number' onChange={field} value={phone_number} type='text' name='phone_number' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth onChange={field} value={date_submitted} name='date_submitted' type='date' autoComplete='current-date' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Drivers License State' onChange={field} value={drivers_license_state} type='text' name='drivers_license_state' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Primary Caregiver' onChange={field} value={primary_caregiver} type='text' name='primary_caregiver' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Landlord Name' onChange={field} value={landlord_name} type='text' name='landlord_name' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Landlord Phone' onChange={field} value={landlord_phone} type='text' name='landlord_phone' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' fullWidth onChange={field} value={landlord_restrictions} multiline maxRows={4} name='landlord_restrictions' label='Landlord Restrictions' type='text' autoComplete='current-landlord-restrictions' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' fullWidth onChange={field} value={yard_description} multiline maxRows={4} name='yard_description' label='Yard Description' type='text' autoComplete='current-yard-description' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Fence Type' onChange={field} value={fence_type} type='text' name='fence_type' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Fence Area' onChange={field} value={fence_area} type='text' name='fence_area' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Fence Height' onChange={field} value={fence_height} type='text' name='fence_height' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Pet Capacity' onChange={field} value={pet_capacity} type='text' name='pet_capacity' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Number of Adults in Household?' onChange={field} value={number_household_adults} type='text' name='number_household_adults' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Number of Children in Household?' onChange={field} value={number_household_children} type='text' name='number_household_children' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Age of Children in Household?' onChange={field} value={household_children_ages} type='text' name='household_children_ages' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' fullWidth onChange={field} value={all_pets} multiline maxRows={4} name='all_pets' label='List all Pets' type='text' autoComplete='current-all-pets' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='How many pets are neutered?' onChange={field} value={how_many_neutered} type='text' name='how_many_neutered' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Where are your previous fosters now?' onChange={field} value={where_pets_now} type='text' name='where_pets_now' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Where are your previous fosters from?' multiline maxRows={4} onChange={field} value={previous_adoption_from} type='text' name='previous_adoption_from' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='If not spayed/neutered, why?' onChange={field} value={if_not_spayed} type='text' name='if_not_spayed' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Current Vet Name?' onChange={field} value={current_vet_name} type='text' name='current_vet_name' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Current Vet Phone?' onChange={field} value={current_vet_phone} type='text' name='current_vet_phone' />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField margin='normal' required fullWidth label='Reference Phone Numbers:' onChange={field} value={reference_phone} type='text' name='reference_phone' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth label='Please list 3 referenes:' onChange={field} value={reference_names} type='text' name='reference_names' />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth label='What type of animal preferences do you have?' onChange={field} value={preferred_animal} type='text' name='preferred_animal' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth label='How much experience do you have with dogs & puppies?' onChange={field} value={dog_puppy_exp} type='text' name='dog_puppy_exp' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField margin='normal' required fullWidth label='How much experience do you have with cats & kittens?' onChange={field} value={cat_kitten_exp} type='text' name='cat_kitten_exp' />
                  </Grid>
                  <TextField margin='normal' required fullWidth label='Who have you previously fostered for?' onChange={field} value={prev_foster_program} type='text' name='prev_foster_program' />

                  <TextField margin='normal' required fullWidth label='How many hours per day will fosters be alone?' onChange={field} value={daily_foster_alone_hours} type='text' name='daily_foster_alone_hours' />
                  <TextField margin='normal' required fullWidth label='foster_care' onChange={field} value={foster_care} type='text' name='foster_care' />
                  <TextField margin='normal' required fullWidth label='foster_sleep' onChange={field} value={foster_sleep} type='text' name='foster_sleep' />
                  <TextField margin='normal' required fullWidth label='foster_time' onChange={field} value={foster_time} type='text' name='foster_time' />

                  <TextField margin='normal' required fullWidth label='Why do you want to be a foster?' multiline maxRows={4} onChange={field} value={reason_to_foster} type='text' name='reason_to_foster' />
                  <Grid item xs={4}>
                    <TextField id='outlined-select-residence' select fullWidth required name='residence_type' label='Residence Type' onChange={field} autoComplete='current-residence-type' value={residence_type}>
                      {residences.map((e) => (
                        <MenuItem key={e.name} value={e.name}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Box sx={{ display: "flex", m: 3 }}>
                    <FormControl component='fieldset' variant='standard'>
                      <FormLabel component='legend'>Select all that apply:</FormLabel>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox checked={has_dogs} onChange={check} name='has_dogs' />} label='Own dogs' />
                        <FormControlLabel control={<Checkbox checked={has_cats} onChange={check} name='has_cats' />} label='Own cats' />
                        <FormControlLabel control={<Checkbox checked={smoke_free_home} onChange={check} name='smoke_free_home' icon={<SmokingRoomsSharpIcon color='error' />} checkedIcon={<SmokeFreeSharpIcon color='success' />} />} label='Smoker?' />
                        <FormControlLabel control={<Checkbox checked={residence_owned} onChange={check} name='residence_owned' />} label='Residence Owned?' />
                        <FormControlLabel control={<Checkbox checked={transport_foster} onChange={check} name='transport_foster' />} label='Can you transport your foster to and from?' />
                        <FormControlLabel control={<Checkbox checked={previous_adopter} onChange={check} name='previous_adopter' />} label='Are you a previous adopter?' />
                        <FormControlLabel control={<Checkbox checked={previously_fostered} onChange={check} name='previously_fostered' />} label='Are you a previous foster?' />
                        <FormControlLabel control={<Checkbox checked={home_visit} onChange={check} name='home_visit' />} label='Are you okay if we do a home visit?' />
                        <FormControlLabel control={<Checkbox checked={seperate_animals} onChange={check} name='seperate_animals' />} label='Can you keep fosters separate from your own animals?' />
                      </FormGroup>
                    </FormControl>
                    <FormControl component='fieldset' variant='standard'>
                      <FormLabel component='legend'>
                        <br></br>
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox checked={has_small_children} onChange={check} name='has_small_children' />} label='Have small children' />

                        <FormControlLabel control={<Checkbox checked={residence_owned} onChange={check} name='residence_owned' />} label='Residence Owned' />
                        <FormControlLabel control={<Checkbox checked={wants_preapproval} onChange={check} name='wants_preapproval' />} label='Get Pre-approved?' />
                        <FormControlLabel control={<Checkbox checked={underground_fence} onChange={check} name='underground_fence' />} label='Underground Fence?' />
                        <FormControlLabel control={<Checkbox checked={kennel} onChange={check} name='kennel' />} label='Kennel?' />
                        <FormControlLabel control={<Checkbox checked={dog_run} onChange={check} name='dog_run' />} label='Dog Run?' />
                        <FormControlLabel control={<Checkbox checked={pet_forfiture} onChange={check} name='pet_forfiture' />} label='Are you a previous adopter?' />
                        <FormControlLabel control={<Checkbox checked={spayed_neutered} onChange={check} name='spayed_neutered' />} label='Are all of your pets spayed / neutered?' />
                        <FormControlLabel control={<Checkbox checked={fenced_yard} onChange={check} name='fenced_yard' />} label='Fenced Yard?' />
                      </FormGroup>
                    </FormControl>
                  </Box>
                  <Box sx={{ m: 3 }}>
                    <FormControl required error={requiredError} component='fieldset' variant='standard'>
                      <FormLabel>Required*</FormLabel>
                      <FormControlLabel control={<Checkbox checkedIcon={<DoneOutlineSharpIcon color='success' />} checked={agrees_to_terms} onChange={check} name='agrees_to_terms' />} label='I agree to the Terms and Conditions* *' />
                    </FormControl>
                  </Box>

                  <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }} endIcon={<PetsIcon />}>
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
