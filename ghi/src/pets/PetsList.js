import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import { Grid, Box, Typography } from '@mui/material/';


async function loadPets(setPetsList) {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pets/`);
  if (response.ok) {
    const data = await response.json();
    setPetsList(data.pets);
  } else {
    console.error(response);
  }
}

function PetsList(props) {
  const [petsList, setPetsList] = useState([]);
  useEffect(() => {
    loadPets(setPetsList);
  }, [])


  async function handleDelete(id) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pets/${id}/`, { method: 'DELETE', credentials: "include" });
    console.log(id)
    if (response.ok) {
      console.log("Success!")
      loadPets(setPetsList);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography
        variant='h3'
        align='center'
        sx={{ py: 4, fontWeight: 'bold' }} >
        Find your FURiend!
      </Typography>
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {petsList.map((pet) => (
          <Grid item xs={4} sm={4} md={4} key={pet.id}>
            <PetCard handleDelete={handleDelete} {...pet} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PetsList;