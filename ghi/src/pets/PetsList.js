import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PetCard from './PetCard';
import Grid from '@mui/material/Grid';


async function loadPets(setPetsList) {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pets/`);
  if (response.ok) {
    const data = await response.json();
    setPetsList(data.pets);
  } else {
    console.error(response);
  }
}

function PetsList(props) {
  const [petsList, setPetsList] = useState([]);
  useEffect(() => {
    loadPets(setPetsList);
  }, [])


  async function handleDelete(id) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pets/${id}/`, {method: 'DELETE', credentials: "include"});
    console.log(id)
    if (response.ok) {
      console.log("Success!")
      loadPets(setPetsList);
    }
  }

  return (
    <div className="px-4 my-5 text-center">
      <Grid container spacing={3}>
      {petsList.map((pet) => (
        <Grid xs item key={pet.id}>
          <PetCard  handleDelete={handleDelete} {...pet}/>
        </Grid>
      ))}
      </Grid>
    </div>
  );
}

export default PetsList;