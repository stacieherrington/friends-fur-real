import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import SliceAppForm from "../applications/SliceAppForm";
import { useDeletePetMutation, useGetCurrentAccountQuery } from "../redux/api";



export default function PetCard(props) {
  const { id, rescue_id, pictures, name } = props.pet;
  const [open, setOpen] = React.useState(false);
  const [deletePet] = useDeletePetMutation();
  const { data, error, isLoading } = useGetCurrentAccountQuery();
  const isRescuer = data && data.rescue_id === props.pet.rescue_id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      {props.pet.pictures && props.pet.pictures.length ? (
        <CardMedia
          component='img'
          height='200'
          image={props.pet.pictures}
          alt={props.pet.breed}
        />
      ) : null}
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.pet.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.pet.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' href={`/pets/${props.pet.id}`}>More Info</Button>
        <SliceAppForm pet_id={id} rescue_id={rescue_id} />
      </CardActions>
      <CardActions>
        {isRescuer && (
          <>
            <Button size="small" href={`/pets/${props.pet.id}`}>Update</Button>
            <Button size="small" onClick={handleClickOpen}>Delete</Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Are you sure you want to delete this pet?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                    deletePet(props.pet.id);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>)}
      </CardActions>
    </Card>
  );
}
