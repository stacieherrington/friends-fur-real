import React from 'react';
import { List, ListItem, ListItemText, Box, Typography, Container, Grid } from '@mui/material';


export default function PetD() {
    const name = 'pet name'
    return (
        <Container sx={{ mt: 7 }}>
            <Box align='center'>
                <Typography variant='h3' sx={{ py: 3 }}>{name}</Typography>
                <Box
                    component="img"
                    sx={{ height: { xs: 240, md: 420, lg: 500 }, mx: "auto" }}
                    alt="The house from the offer."
                    src="https://images.pexels.com/photos/3688579/pexels-photo-3688579.jpeg" />
            </Box>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={3} sm={3} md={3} >
                    <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemText primary="Name" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Type" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Breed" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Age" secondary={name} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={3} sm={3} md={3} >
                    <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemText primary="Sex" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Size" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Weight" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Color" secondary={name} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={3} sm={3} md={3} >
                    <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemText primary="Ok With Dog?" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ok With Cat?" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ok With Children?" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Shots Up to Data?" secondary={name} />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={3} sm={3} md={3} >
                    <List sx={{ maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemText primary="Spayed or Neutered?" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="House Trained?" secondary={name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Special Needs?" secondary={name} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    )
}
