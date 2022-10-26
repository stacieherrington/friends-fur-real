import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useParams, useNavigate } from "react-router-dom";
import { useAddSuccessStoryMutation } from '../redux/api';
import { Input } from '@mui/material';



export default function StoryForm() {
  const { applicationId } = useParams()
  const [fields, setFields] = useState({
    "title": "",
    "story": "",
    "picture": "",
    "signature": "",
  });

  const [addStory, { form: storyCreate }] = useAddSuccessStoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    addStory({ applicationId, form: event.target })
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    const update = { ...fields, [name]: value };
    setFields(update);
  };
  if (storyCreate) {
    setTimeout(() => navigate("/"), 0)
  };

  return (
    <>
      <Container
        sx={{
          width: 'fit-content'
        }}>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <Box sx={{ paddingTop: 6, paddingBottom: 5 }}>
            <Typography component="h1" variant="h4" sx={{ py: 2, color: "#CFE0FB" }}>
              Share your story
            </Typography>
            <TextField
              value={fields.title}
              onChange={handleChange}
              label="Title"
              id="title"
              name="title"
              variant="outlined"
              size="small"
              required
              color="primary"
              sx={{ marginBottom: 3 }}
            />
            <TextField
              onChange={handleChange}
              label="Story"
              value={fields.story}
              id="story"
              name="story"
              variant="outlined"
              size="small"
              color="primary"
              fullWidth
              required
              multiline
              rows={5}
            />
            <Typography>
              Please upload a recent photo.
            </Typography>
            <Input
              type="file"
              fullWidth
              id="picture"
              name="picture"
            />
            <TextField
              onChange={handleChange}
              label="How do you want to sign your story? First name? Initials? Location?"
              value={fields.signature}
              id="signature"
              name="signature"
              variant="outlined"
              size="small"
              color="primary"
              fullWidth
              required
            />
          </Box>
          <Button
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