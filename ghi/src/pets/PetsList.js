import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


async function loadPets(setPetsList) {
  const response = await fetch(`http://localhost:8000/api/pets/`);
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


  async function deletePet(id) {
    const response = await fetch(`http://localhost:8000/api/pets/${id}/`, {method: 'DELETE'});
    if (response.ok) {
      loadPets(setPetsList);
    }
  }
// pets list is returning as a table right now but needs to be mapped over the Card component
  return (
  <div>
      <div>
        <h1>Pets</h1>
      </div>
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {petsList.map(pet => {
            return (
              <tr key={pet.id}>
                <td>{ pet.name }</td>
                <td>{pet.type}</td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td>{pet.sex}</td>
                <td>{pet.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
  }

  export default PetsList;