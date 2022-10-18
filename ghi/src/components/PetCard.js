import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PetCard(props) {

  return (
    <Card sx={{ maxWidth: 250 }}>
      {props.pictures && props.pictures.length?<CardMedia
        component="img"
        height="200"
        image={props.pictures[0]}
        alt={props.breed}
      />: null}
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
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}