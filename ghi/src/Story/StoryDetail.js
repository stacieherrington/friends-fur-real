import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Copyright from "../components/Copyright";



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
      <Box sx={{
        mt: '7%',
        mx: 5,
        py: 4,
        alignSelf: 'center',
        backgroundColor: '#FFEFD3',
        height: "100%",
        alignContent: 'center'
      }}>
        <Box fixed="true" sx={{ marginX: '2%', height: 'fit-content', padding: 2 }} align='center'>
          {story.picture ? <img src={story.picture} width="30%" alt="pet" /> : null}
          <hr className="solid" />
          <Typography sx={{ mb: 1.5, fontSize: 25, fontWeight: 'bold', textAlign: 'justify' }} color="#FF9633">
            {story.title}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>
            {story.story}
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 7, mb: 0 }} />
    </>
  )
}
