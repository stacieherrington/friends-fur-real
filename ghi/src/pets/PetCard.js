import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function PetCard(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card>
      {props.pictures && props.pictures.length ? <CardMedia
        component="img"
        height="200"
        image={props.pictures}
        alt={props.breed}
      /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More Info</Button>
        <Button size="small">Adopt</Button>
      </CardActions>
      <CardActions>
        {/* Only show this for staff/admin role */}
        <Button size="small">Update</Button>
        <Button size="small" onClick={handleClickOpen}>Delete</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this pet?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Cancel</Button>
            <Button onClick={() => { handleClose(); props.handleDelete(props.id) }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}