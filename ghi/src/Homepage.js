import * as React from 'react';
import SearchBar from './components/SearchBar';
import PetCard from './components/PetCard';
import StoryCard from './components/StoryCard'
import Copyright from './components/Copyright';
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';


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

  return (
    <>
      <div className="px-4 my-5 text-center">
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
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Pet Highlights</h1>
            <div className="py-3">
              <Grid container spacing={3}>
              {petsList.map((pet) => (
                <Grid xs item key={pet.id}>
                  <PetCard {...pet} />
                </Grid>
              ))}
              </Grid>
            </div>
          </div>
          <div className="container-fluid py-1">
            <h1 className="display-5 fw-bold">Success Stories</h1>
            <div className="py-3">
              <StoryCard />
            </div>
          </div>
        </div>
      </div >
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </>
  )
}


export default HomePage;