import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { createFilterOptions, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';




export default function StoryForm() {
  const [petsData, setPets] = useState([])
  const [pet, setPet] = useState('')
  const [title, setTitle] = useState('')
  const [story, setStory] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [storyError, setStoryError] = useState(false)

  const fetchPet = async () => {
    const url = 'http://localhost:8000/api/pets/';
    const response = await fetch(url)
    const petsJson = await response.json()
    setPets(petsJson.pets)
    console.log("PETS", petsJson.pets)
  }
  useEffect(() => {
    fetchPet()
  }, []);

  const handleChange = (event) => {
    setPet(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new story(event.currentTarget);
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
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small">Select a pet</InputLabel>
              <Select onChange={handleChange} id="select" value={pet}>
                {petsData.map((pet) => (
                  <MenuItem key={pet.id} value={pet.name}>
                    {pet.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p></p>
            <TextField
              onChange={(event) => setTitle(event.target.value)}
              label="Title"
              id="title"
              name="title"
              variant="outlined"
              size="small"
              required
              color="primary"
              sx={{ marginBottom: 3 }}
              error={titleError}
            />

            {/* <Autocomplete
              id="pet_id"
              options={petsData}
              getOptionLabel={(option) => option.pet_name}
              filterOptions={filterOptions}
              sx={{ width: "auto", paddingBottom: 2 }}
              size="small"
              renderInput={(params) => <TextField {...params} label="Choose pet" />}
            /> */}


            <TextField
              onChange={(event) => setStory(event.target.value)}
              label="Story"
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
          >
            Submit story
          </Button>
        </Box>
        <Copyright sx={{ mt: 10, mb: 4 }} />
      </Container>
    </>
  );
}