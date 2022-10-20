import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PetCard from "./PetCard";
import { Grid, Box, Typography } from "@mui/material/";
import { useListPetsQuery, useDeletePetMutation } from "../redux/api";
import { useSelector, useDispatch } from "react-redux";

// async function loadPets(setPetsList) {
//   const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pets/`);
//   if (response.ok) {
//     const data = await response.json();
//     setPetsList(data.pets);
//   } else {
//     console.error(response);
//   }
// }

export default function PetsList() {
  // const dispatch = useDispatch()
  // const selector = useSelector()
  const { data, error, isLoading } = useListPetsQuery();
  console.log(data);
  if (isLoading) {
  }
  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography
        variant='h3'
        align='center'
        sx={{ py: 3, fontWeight: "bold" }}
      >
        Pet List Page
      </Typography>
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((pet) => (
          <Grid item xs={4} sm={4} md={4} key={pet}>
            <PetCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
