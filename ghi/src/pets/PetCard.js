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
import { Popover, Box } from "@mui/material";
import PetDetailPopover from "./PetDetailPopover";


export default function PetCard(props) {
  const { id, rescue_id, pictures, name } = props.pet;
  const [open, setOpen] = React.useState(false);
  const [deletePet] = useDeletePetMutation();
  const { data, error, isLoading } = useGetCurrentAccountQuery();
  const isRescuer = data && data.rescue_id === props.pet.rescue_id;

  // for petDetail Popover:
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleDetailClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDetailClose = () => {
    setAnchorEl(null);
  };
  const openDetail = Boolean(anchorEl);
  const detailId = openDetail ? "simple-popover" : undefined;
  // petDetail Popover done

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 680 }}>
      {props.pet.pictures && props.pet.pictures.length ? (
        <CardMedia
          component='img'
          width="100%"
          image={props.pet.pictures}
          alt={props.pet.breed}
        />
      ) : null}
      <CardContent sx={{ padding: 1 }}>
        <Typography gutterBottom variant='h5' component='div'>
          {props.pet.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {props.pet.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button aria-describedby={detailId} onClick={handleDetailClick}>
          More Info
        </Button>
        <Popover
          id={detailId}
          open={openDetail}
          anchorEl={anchorEl}
          onClose={handleDetailClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          <PetDetailPopover petId={id} />
        </Popover>
        <SliceAppForm pet_id={id} rescue_id={rescue_id} sx={{ pb: 0 }} />
      </CardActions>
      <CardActions>
        {isRescuer && (
          <>
            <Button sx={{ pt: 0, pb: 5 }} size="small" href={`/pets/${props.pet.id}`}>Update</Button>
            <Button sx={{ pt: 0, pb: 5 }} size="small" onClick={handleClickOpen}>Delete</Button>
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
