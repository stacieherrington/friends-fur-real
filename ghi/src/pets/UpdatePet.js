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
import { useState } from 'react';
import { FormGroup } from '@mui/material';


const theme = createTheme();


export default function UpdatePet(props) {
  const [fields, setFields] = useState({
    "name": props.name,
    "type": props.type,
    "breed": props.breed,
    "age": props.age,
    "sex": props.sex,
    "size": props.size,
    "description": props.description,
    "weight": props.weight,
    "pictures": props.pictures,
    "primary_color": props.primary_color,
    "ok_with_dogs": props.ok_with_dogs,
    "ok_with_cats": props.ok_with_cats,
    "shots_up_to_date": props.shots_up_to_date,
    "ok_with_kids": props.ok_with_kids,
    "spayed_neutered": props.spayed_neutered,
    "house_trained": props.house_trained,
    "special_needs": props.special_needs,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    fields.age = Number.parseInt(fields.age)
    fields.weight = Number.parseInt(fields.weight)
    const url = `${process.env.REACT_APP_API_HOST}/api/pets/${props.id}`;
    const response = await fetch(url, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(fields),
      headers: {"content-type": "application/json"},
    });
    if (response.ok) {
      console.log("Success!")
    } else {
      console.error(response)
    }
  };
  const handleChange = (event) => {
    let {name, type, value, checked} = event.target;
    if (type === "checkbox") {
      value = checked;
    }
    const update = {...fields, [name]: value};
    setFields(update);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#CFE0FB' }}>
              <PetsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add a pet
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={fields.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    required
                    fullWidth
                    id="type"
                    label="Select"
                    name="type"
                    onChange={handleChange}
                    value={fields.type}
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
                    required
                    fullWidth
                    id="breed"
                    label="Breed"
                    name="breed"
                    onChange={handleChange}
                    value={fields.breed}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
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
                    value={fields.age}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Select"
                    value={fields.sex}
                    name="sex"
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
                    required
                    fullWidth
                    select
                    label="Select"
                    value={fields.size}
                    name="size"
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
                    type={"number"}
                    onChange={(event) => {
                        if (event.target.value < 0) {
                            event.target.value = 0;
                          }
                          handleChange(event);
                    }}
                    value={fields.weight}
                    fullWidth
                    id="weight"
                    label="Weight"
                    name="weight"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="url"
                    fullWidth
                    id="pictures"
                    label="Picture URL"
                    name="pictures"
                    onChange={handleChange}
                    value={fields.pictures}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="color"
                    label="Color"
                    name="primary_color"
                    onChange={handleChange}
                    value={fields.primary_color}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={handleChange}
                      checked={fields.ok_with_dogs}
                      name="ok_with_dogs"
                    />}
                      label="Ok with dogs" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={handleChange}
                      checked={fields.ok_with_cats}
                      name="ok_with_cats"/>
                      } label="Ok with cats" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={handleChange}
                      checked={fields.ok_with_kids}
                      name="ok_with_kids"/>
                      } label="Ok with children" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={handleChange}
                      checked={fields.shots_up_to_date}
                      name="shots_up_to_date"
                    />} label="Shots up to date" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={handleChange}
                      checked={fields.spayed_neutered}
                      name="spayed_neutered"
                     />} label="Spayed or neutered" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                    onChange={handleChange}
                      checked={fields.house_trained}
                      name="house_trained"
                     />} label="House-trained" />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox
                      onChange={handleChange}
                      checked={fields.special_needs}
                      name="special_needs"
                     />} label="Special needs" />
                  </FormGroup>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Pet
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 10 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}