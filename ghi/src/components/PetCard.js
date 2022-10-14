import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PetCard() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        height="200"
        image="images/pit-dog.jpg"
        alt="Pitbull"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ozzy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer. Amet volutpat consequat mauris nunc congue nisi vitae suscipit.
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