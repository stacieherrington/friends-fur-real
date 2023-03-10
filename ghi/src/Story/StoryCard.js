import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function StoryCard(props) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 680 }}>
      {props.picture ? <CardMedia
        component="img"
        width="100%"
        image={props.picture}
        alt="pet"
      /> : null}
      <CardContent
        sx={{ pl: 2, pt:1, margin: 0 }}
      >
        <Typography gutterBottom variant="h5" component="div"
          sx={{
            fontWeight:"bold",
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}>
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
        >
          {props.story}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ textAlign: "center", paddingLeft:1 }}
          href={`/stories/${props.id}`} size="small">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}