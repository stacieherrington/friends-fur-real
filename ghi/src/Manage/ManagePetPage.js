import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PetCard from "../pets/PetCard";
import { Grid, Box, Typography, Container, Button } from "@mui/material/";
import PetsIcon from "@mui/icons-material/Pets";

async function loadPets(setPetsList) {
  const response = await fetch(
    `${process.env.REACT_APP_API_HOST}/api/manage/pets/`,
    { method: "get", credentials: "include" }
  );
  if (response.ok) {
    const data = await response.json();
    setPetsList(data.pets);
  } else {
    console.error(response);
  }
}

function ManagePetPage(props) {
  const [petsList, setPetsList] = useState([]);
  useEffect(() => {
    loadPets(setPetsList);
  }, []);

  async function handleDelete(id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/pets/${id}/`,
      { method: "DELETE", credentials: "include" }
    );
    console.log(id);
    if (response.ok) {
      console.log("Success!");
      loadPets(setPetsList);
    }
  }

  return (
    <Container sx={{ pt: 12 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ pb: 5, fontWeight: "bold" }}
        >
          Manage Pets
        </Typography>
        <Button
          href="/pets/create"
          variant="contained"
          sx={{ mt: 0, mb: 3, backgroundColor: "#294C60" }}
          endIcon={<PetsIcon />}
        >
          Add Pet
        </Button>
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
          {petsList.map((pet) => (
            <Grid item xs={4} sm={4} md={4} key={pet.id}>
              <PetCard pet={pet} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ManagePetPage;
