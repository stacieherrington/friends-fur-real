import * as React from 'react';
import SearchBar from './components/SearchBar';
import PetCard from './pets/PetCard';
import StoryCard from './Story/StoryCard'
import Copyright from './components/Copyright';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Box } from "@mui/material"


async function loadThreePets(setPetsList) {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/random/pets/`);
  if (response.ok) {
    const data = await response.json();
    setPetsList(data.pets);
  } else {
    console.error(response);
  }
}

function HomePage(props) {
  const [petsList, setPetsList] = useState([]);
  useEffect(() => {
    loadThreePets(setPetsList);
  }, [])

  async function handleDelete(id) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pets/${id}/`, { method: 'DELETE', credentials: "include" });
    console.log(id)
    if (response.ok) {
      console.log("Success!")
      loadThreePets(setPetsList);
    }
  }

  return (
    <>
      <div className="px-4 my-5 pt-5 text-center">
        <SearchBar />
        <div className="py-3">
          <h1 className="display-3 fw-bold">FriendsFurReal</h1>
          <div style={{ backgroundImage: "url(/images/pups.jpg)" }}>
            <img
              src="images/pups.jpg"
              width="50%"
              className="d-inline-block align-top"
              alt="Pet logo"
              shape="rounded"
            />
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h3' sx={{ py: 3, fontWeight: 'bold' }}>Featured Friends</Typography>
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
              {petsList.map((pet) => (
                <Grid item xs={4} sm={4} md={4}>
                  <PetCard handleDelete={handleDelete} {...pet} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h3' sx={{ py: 3, fontWeight: 'bold' }}>Happy</Typography>
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
              {petsList.map((pet) => (
                <Grid item xs={4} sm={4} md={4}>
                  {/* <PetCard handleDelete={handleDelete} {...pet} /> */}
                  <StoryCard />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div >
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </>
  )
}


export default HomePage;