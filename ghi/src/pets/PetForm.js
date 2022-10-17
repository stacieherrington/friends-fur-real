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
import { MenuItem } from '@mui/material';


const theme = createTheme();

const sexes = [
  {
    value: 'female',
  },
  {
    value: 'male',
  },
]


export default function SignUpForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const handleChange = (event) => {
      setSex(event.target.value);
    };
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="type"
                    label="Type"
                    name="type"
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
                    required
                    select
                    label="Select"
                    value={sexes}
                    onChange={handleChange}
                    helperText="Please select sex"
                  >
                    {sexes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
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