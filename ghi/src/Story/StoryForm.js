import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useParams } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';




export default function StoryForm() {
  const { applicationId } = useParams()
  const [title, setTitle] = useState('')
  const [story, setStory] = useState('')
  const [picture, setPicture] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [storyError, setStoryError] = useState(false)
  const [pictureError, setPictureError] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/api/applications/${applicationId}/story/`;
    const data = { title, story, picture };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    console.log(data)
    if (response.ok) {
      console.log('YAY!')
    }
    setTitleError(false)
    setStoryError(false)
    if (title == '') {
      setTitleError(true)
    }
    if (story == '') {
      setStoryError(true)
    }
    if (picture == '') {
      setPictureError(true)
    }
  };


  return (
    <>
      <Container
        sx={{
          width: 'fit-content'
        }}>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <Box sx={{ paddingTop: 20, paddingBottom: 5 }}>
            <Typography component="h1" variant="h4" sx={{ py: 2, color: "#294C60" }}>
              Share your story
            </Typography>
            <TextField
              onChange={(event) => setTitle(event.target.value)}
              label="Title"
              value={title}
              id="title"
              name="title"
              variant="outlined"
              size="small"
              required
              color="primary"
              sx={{ marginBottom: 3 }}
              error={titleError}
            />
            <TextField
              onChange={(event) => setStory(event.target.value)}
              label="Story"
              value={story}
              id="story"
              name="story"
              variant="outlined"
              size="small"
              color="primary"
              fullWidth
              required
              multiline
              rows={5}
              error={storyError}
            />
            <TextField
              sx={{ marginTop: 3 }}
              onChange={(event) => setPicture(event.target.value)}
              label="A recent picture URL"
              value={picture}
              id="picture"
              name="picture"
              variant="outlined"
              size="small"
              color="primary"
              fullWidth
              required
              error={pictureError}
            />
          </Box>
          <Button            
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2, backgroundColor: "#294C60" }}
            endIcon={<PetsIcon />}
          >
            Submit story
          </Button>
        </Box>
        <Copyright sx={{ mt: 10, mb: 4 }} />
      </Container>
    </>
  );
}