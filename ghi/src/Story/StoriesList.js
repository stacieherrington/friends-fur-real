import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import StoryCard from './StoryCard';


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
  const [StoriesList, setStoriesList] = useState([]);
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
    <div className="px-4 my-5 text-center">
      <Grid container spacing={3}>
        {StoriesList.map((story) => (
          <Grid xs item key={story.id}>
            <StoryCard {...story} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default StoriesList;