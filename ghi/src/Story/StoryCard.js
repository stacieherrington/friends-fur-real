import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function StoryCard(props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {props.picture ? <CardMedia
        component="img"
        height="180"
        image={props.picture}
        alt="pet"
      /> : null}
      <CardContent
        sx={{ padding: 1, margin: 0 }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
          gutterBottom
          variant="body2"
          color="text.secondary"
          height="100%" >
          {props.story}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/stories/${props.id}`} size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}