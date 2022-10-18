import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import SendRoundedIcon from '@mui/icons-material/SendRounded';




export default function StoryForm() {

  const [title, setTitle] = useState('')
  const [story, setStory] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [storyError, setStoryError] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/api/applications/{application_id}/story/`;
    const data = { title, story };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
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
  };


  return (
    <>
      <Container
        sx={{
          maxWidth: 500
        }}>

        <Box component="form" onSubmit={handleSubmit} noValidate >
          <Box sx={{ paddingTop: 6, paddingBottom: 5 }}>
            <Typography component="h1" variant="h4" sx={{ py: 2, color: "#CFE0FB" }}>
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
          </Box>
          <Button
            onClick={() => console.log('clicked!!')}
            type="submit"
            variant="outlined"
            sx={{ mb: 2 }}
            color="primary"
            endIcon={<SendRoundedIcon />}
          >
            Submit story
          </Button>
        </Box>
        <Copyright sx={{ mt: 10, mb: 4 }} />
      </Container>
    </>
  );
}