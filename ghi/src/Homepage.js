import * as React from "react";

import PetCard from "./pets/PetCard";
import StoryCard from "./Story/StoryCard";
import Copyright from "./components/Copyright";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Container } from "@mui/material";
import { useGetThreePetsQuery } from "./redux/api";

async function loadThreeStories(setStoriesList) {
  const response = await fetch(
    `${process.env.REACT_APP_API_HOST}/api/stories/random/`
  );
  if (response.ok) {
    const data = await response.json();
    setStoriesList(data.stories);
  } else {
    console.error(response);
  }
}

function HomePage(props) {
  const [storiesList, setStoriesList] = useState([]);
  const { data: petsList, error, isLoading } = useGetThreePetsQuery();
  useEffect(() => {
    loadThreeStories(setStoriesList);
  }, []);

  return (
    <>
      <Container className='mt-5 mb-0 pt-5 text-center'>
        <div className='py-4'>
          <Typography variant='h2' sx={{ fontWeight: "bold" }}>
            Friends FurReal
          </Typography>
          <div
            style={{ backgroundImage: "url(/images/pups.jpg)", paddingTop: 3 }}
          >
            <img
              src='images/pups.jpg'
              width='50%'
              className='d-inline-block align-top'
              alt='Pet logo'
              shape='rounded'
            />
          </div>

          <Box sx={{ flexGrow: 1 }}>
            {" "}
            {/* random pet list */}
            <Typography variant='h3' sx={{ py: 3, fontWeight: "bold" }}>
              Featured Friends
            </Typography>
            <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
              {petsList &&
                petsList.map((pet) => (
                  <Grid item xs={4} sm={4} md={4} key={pet.id}>
                    <PetCard pet={pet} />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {storiesList.length !== 0 ? (
            <Box sx={{ flexGrow: 1 }}>
              {" "}
              {/* random story list */}
              <Typography variant='h3' sx={{ py: 3, fontWeight: "bold" }}>
                Happy Tails
              </Typography>
              <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
                {storiesList.map((story) => (
                  <Grid item xs={4} sm={4} md={4} key={story.id}>
                    <StoryCard {...story} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : null}
        </div>
      </Container>
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </>
  );
}

export default HomePage;
