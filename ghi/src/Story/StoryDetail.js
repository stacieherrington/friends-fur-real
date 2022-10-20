import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';



export default function StoryDetail() {
  const [story, setStory] = useState('')
  const { storyId } = useParams()


  const fetchStory = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/stories/${storyId}/`;
    const response = await fetch(url)
    console.log(response)
    const storyJson = await response.json()
    setStory(storyJson)
    console.log("STORIES", storyJson)
  };
  useEffect(() => {
    fetchStory()
  }, []);

  return (
    <>
      <Box fixed sx={{ mt: '5%', mb: 5, py: 4, alignSelf: 'center', backgroundColor: '#FFEFD3', height: 'max-content', alignContent: 'center' }}>
        <Box sx={{ marginX: '2%', height: '100%', padding: 2 }} align='center'>
          {story.picture ? <img src={story.picture} width="50%" alt="pet" /> : null}
          <hr class="solid" />
          <Typography sx={{ mb: 1.5, fontSize: 25, fontWeight: 'bold', textAlign: 'justify' }} color="#FF9633">
            {story.title}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>
            {story.story}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
