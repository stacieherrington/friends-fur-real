import PetCard from "./PetCard";
import { Grid, Box, Typography } from "@mui/material/";
import { useListPetsQuery } from "../redux/api";


export default function PetsList() {

  const { data, error, isLoading } = useListPetsQuery();

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography
        variant='h3'
        align='center'
        sx={{ py: 3, fontWeight: "bold" }}
      >
        Adoptable Pets
      </Typography>
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data && data.map((pet) => (
          <Grid item xs={4} sm={4} md={4} key={pet.id}>
            <PetCard pet={pet}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}