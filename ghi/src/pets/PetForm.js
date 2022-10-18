import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { json } from 'react-router-dom';


const theme = createTheme();


export default function SignUpForm() {
  const [fields, setFields] = useState({
    "name": "",
    "type": "",
    "breed": "",
    "age": "",
    "sex": "",
    "size": "",
    "description": "",
    "weight": "",
    "pictures": [],
    "primary_color": "",
    "ok_with_dogs": true,
    "ok_with_cats": true,
    "shots_up_to_date": true,
    "ok_with_kids": true,
    "spayed_neutered": true,
    "house_trained": true,
    "special_needs": true,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    fields.age = Number.parseInt(fields.age)
    fields.weight = Number.parseInt(fields.weight)
    const url = `${process.env.REACT_APP_API_HOST}/api/pets`;
    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
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
    const update = {...fields, [event.target.name]: event.target.value};
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="type"
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    value={fields.type}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="breed"
                    label="Breed"
                    name="breed"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type={"number"}
                    onChange={(event) =>
                        event.target.value < 0
                            ? (event.target.value = 0)
                            : event.target.value
                    }
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    name="age"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
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