import React from 'react';
import { List, ListItem, ListItemText, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useGetPetQuery } from '../redux/api';


export default function PetDetailPopover(props) {
  const { petId } = props;
  const name = 'test'
  const { data, isLoading } = useGetPetQuery(petId);
  const [petData, setPetData] = React.useState(null);
  React.useEffect(() => {
    if (data) {
      setPetData(data);
    }
  }, [data])
  window.dispatchEvent(new Event("resize"))
  if (petData)
    return (
      <Container sx={{ mt: 7 }}>
        <Box align='center'>
          <Typography variant='h3' sx={{ py: 3 }}>{petData.name}</Typography>
          <Box
            component="img"
            sx={{ height: { xs: 240, md: 420, lg: 500 }, mx: "auto" }}
            src={petData.pictures} />
          <Paper sx={{ m: 1, maxWidth: { xs: 490, md: 610, lg: 730 } }}><Typography>{petData.description}</Typography></Paper>
        </Box>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={3} sm={3} md={3} >
            <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary="Name" secondary={petData.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Type" secondary={petData.type} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Breed" secondary={petData.breed} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Age" secondary={petData.age} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} sm={3} md={3} >
            <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary="Sex" secondary={petData.sex} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Size" secondary={petData.size} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Weight" secondary={petData.weight} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Color" secondary={petData.primary_color} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} sm={3} md={3} >
            <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary="Ok with dogs?" secondary={petData.ok_with_dogs ? "yes" : "no"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ok with cats?" secondary={petData.ok_with_kids ? "yes" : "no"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ok with children?" secondary={petData.ok_with_dogs ? "yes" : "no"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Shots up-to-date?" secondary={petData.ok_with_dogs ? "yes" : "no"} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} sm={3} md={3} >
            <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary="Spayed or neutered?" secondary={petData.spayed_neutered ? "yes" : "no"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="House-trained?" secondary={petData.house_trained ? "yes" : "no"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Special needs?" secondary={petData.special_needs ? "yes" : "no"} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Is adopted?" secondary={petData.is_adopted ? "yes" : "no"} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    )
}
