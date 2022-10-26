import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useParams, useNavigate } from "react-router-dom";
import { useAddSuccessStoryMutation } from '../redux/api';
import { Input } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';




export default function StoryForm() {
  const { applicationId } = useParams()
  const [fields, setFields] = useState({
    "title": "",
    "story": "",
    "picture": "",
    "signature": "",
  });

  const [addStory] = useAddSuccessStoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    addStory({ applicationId, form: event.target });
    setTimeout(() => navigate("/"), 0);
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    const update = { ...fields, [name]: value };
    setFields(update);
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
            <Typography sx={{ marginTop: 3 }}>
              Please upload a recent photo.
            </Typography>
            <Input
              type="file"
              fullWidth
              id="picture"
              name="picture"
              sx={{ my: 3 }}
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