import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { FormGroup, Input } from '@mui/material';
import { useParams } from "react-router-dom";
import { useGetPetQuery, usePutPetMutation, useGetTokenQuery } from '../redux/api';
import { useNavigate } from 'react-router-dom';



const theme = createTheme();


export default function UpdatePet() {
  const { petId } = useParams();
  const { data, isLoading } = useGetPetQuery(petId);
  const [updatePet, { data: petUpdate }] = usePutPetMutation();
  const navigate = useNavigate()
  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenLoading,
  } = useGetTokenQuery();
  const [isRescuer, setIsRescuer] = useState(false);
  const [fields, setFields] = useState({
    "name": "",
    "type": "",
    "breed": "",
    "age": "",
    "sex": "",
    "size": "",
    "description": "",
    "weight": "",
    "pictures": "",
    "primary_color": "",
    "ok_with_dogs": false,
    "ok_with_cats": false,
    "shots_up_to_date": false,
    "ok_with_kids": false,
    "spayed_neutered": false,
    "house_trained": false,
    "special_needs": false,
  });
  useEffect(() => {
    if (data !== undefined) {
      let pet = { ...data }
      if (pet.pictures === null) {
        pet.pictures = "";
      }
      setFields(pet);
      if (tokenData) {
        setIsRescuer(tokenData.account.rescue_id === data.rescue_id)
      }
    }
  }, [data, tokenData]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    fields.age = Number.parseInt(fields.age)
    fields.weight = Number.parseInt(fields.weight)
    updatePet({ petId, form: event.target })
  };
  const handleChange = (event) => {
    let { name, type, value, checked } = event.target;
    if (type === "checkbox") {
      value = checked;
    }
    const update = { ...fields, [name]: value };
    setFields(update);
  };
  if (petUpdate) {
    setTimeout(() => navigate("/pets"), 0)
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#294C60' }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update pet
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    disabled={!isRescuer}
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={fields.name? fields.name : ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!isRescuer}
                    select
                    required
                    fullWidth
                    id="type"
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    value={fields.type? fields.type : ''}
                    helperText="Please select type"
                  >
                    <MenuItem value="dog">
                      dog
                    </MenuItem>
                    <MenuItem value="cat">
                      cat
                    </MenuItem>
                    <MenuItem value="other">
                      other
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!isRescuer}
                    required
                    fullWidth
                    id="breed"
                    label="Breed"
                    name="breed"
                    onChange={handleChange}
                    value={fields.breed? fields.breed : ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!isRescuer}
                    type={"number"}
                    onChange={(event) => {
                      if (event.target.value < 0) {
                        event.target.value = 0;
                      }
                      handleChange(event);
                    }}
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                    value={fields.age? fields.age : ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!isRescuer}
                    required
                    fullWidth
                    select
                    label="Sex"
                    name="sex"
                    value={fields.sex}
                    onChange={handleChange}
                    helperText="Please select sex"
                  >
                    <MenuItem value="female">
                      female
                    </MenuItem>
                    <MenuItem value="male">
                      male
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!isRescuer}
                    required
                    fullWidth
                    select
                    label="Size"
                    name="size"
                    value={fields.size? fields.size : ''}
                    onChange={handleChange}
                    helperText="Please select size"
                  >
                    <MenuItem value="small">
                      small
                    </MenuItem>
                    <MenuItem value="medium">
                      medium
                    </MenuItem>
                    <MenuItem value="large">
                      large
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={!isRescuer}
                    type={"number"}
                    onChange={(event) => {
                      if (event.target.value < 0) {
                        event.target.value = 0;
                      }
                      handleChange(event);
                    }}
                    value={fields.weight? fields.weight : ''}
                    fullWidth
                    id="weight"
                    label="Weight"
                    name="weight"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Please upload a photo.
                  </Typography>
                  <Input
                    disabled={!isRescuer}
                    type="file"
                    fullWidth
                    id="pictures"
                    name="pictures"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={!isRescuer}
                    fullWidth
                    id="color"
                    label="Color"
                    name="primary_color"
                    onChange={handleChange}
                    value={fields.primary_color? fields.primary_color : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    multiline
                    fullWidth
                    disabled={!isRescuer}
                    id="description"
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    value={fields.description? fields.description : ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.ok_with_dogs? fields.ok_with_dogs : false}
                      name="ok_with_dogs"
                    />}
                      label="Ok with dogs" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.ok_with_cats? fields.ok_with_cats : false}
                      name="ok_with_cats" />
                    } label="Ok with cats" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.ok_with_kids? fields.ok_with_kids : false}
                      name="ok_with_kids" />
                    } label="Ok with children" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.shots_up_to_date? fields.shots_up_to_date : false}
                      name="shots_up_to_date"
                    />} label="Shots up to date" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.spayed_neutered? fields.spayed_neutered : false}
                      name="spayed_neutered"
                    />} label="Spayed or neutered" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.house_trained? fields.house_trained : false}
                      name="house_trained"
                    />} label="House-trained" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      disabled={!isRescuer}
                      onChange={handleChange}
                      checked={fields.special_needs? fields.name : false}
                      name="special_needs"
                    />} label="Special needs" />
                  </FormGroup>
                </Grid>
              </Grid>
              {isRescuer ?
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }}
                  endIcon={<PetsIcon />}
                  type="submit"
                  fullWidth
                >
                  Update Pet
                </Button> : null}
            </Box>
          </Box>
          <Copyright sx={{ mt: 10 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}