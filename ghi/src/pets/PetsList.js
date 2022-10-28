import PetCard from "./PetCard";
import {
  Grid,
  Box,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  Container,
} from "@mui/material/";
import { useListPetsQuery } from "../redux/api";
import { useEffect, useState } from "react";
import Copyright from "../components/Copyright";

export default function PetsList() {
  const { data, isLoading } = useListPetsQuery();
  const [petType, setPetType] = useState("all");
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    if (data) {
      setPetList(data);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading pets...</h1>;
  }

  const handleChange = (event) => {
    event.preventDefault();
    setPetType(event.target.value);

    event.target.value === "all"
      ? setPetList(data)
      : setPetList(
          data.filter((pet) => pet.type.toLowerCase() === event.target.value)
        );
  };

  return (
    <>
    <Container sx={{ pt: 12, paddingLeft:0, paddingRight:0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ pb: 5, fontWeight: "bold" }}
        >
          Adoptable Pets
        </Typography>
        <Box marginBottom={5}>
          <Grid container justifyContent="center" spacing={2} columns={16}>
            <Grid item xs={3} textAlign="center" >
              <InputLabel
                sx={{ fontWeight: 'bold', fontSize:18}}>Select Pet Type</InputLabel>
              <Select
                id="demo-simple-select"
                value={petType}
                label="Pet Type"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"dog"}>Dog</MenuItem>
                <MenuItem value={"cat"}>Cat</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {petList &&
            petList.map((pet) => (
              <Grid item xs={4} sm={4} md={4} key={pet.id}>
                <PetCard pet={pet} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
    <Copyright sx={{ mt: 10, mb: 4 }} />
    </>
  );
}
