import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import StoryCard from './StoryCard';
import { Box, Typography } from "@mui/material";
import Copyright from "../components/Copyright";


async function loadStories(setStoriesList) {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/stories/`);
  if (response.ok) {
    const data = await response.json();
    setStoriesList(data.stories);
  } else {
    console.error(response);
  }
}

function StoriesList(props) {
  const [storiesList, setStoriesList] = useState([]);
  useEffect(() => {
    loadStories(setStoriesList);
  }, [])


  async function deleteStory(id) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/stories/${id}/`, { method: 'DELETE' });
    if (response.ok) {
      loadStories(setStoriesList);
    }
  }

  return (
    <>
    <Box sx={{ flexGrow: 1, pt: 12 }}>
      <Typography variant='h3' align='center' sx={{ pb:5, fontWeight: 'bold' }}>Happy Tails</Typography>
      {storiesList ? (
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {storiesList.map((story) => (
          <Grid item xs={4} sm={4} md={4} key={story.id}>
            <StoryCard {...story} />
          </Grid>
        ))}
      </Grid>
      )
      :
      <Typography> Write your story</Typography>
    }
      </Box>
      <Copyright sx={{ mt: 10, mb: 4 }} />
    </>
  );
}

export default StoriesList;