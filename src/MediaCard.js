import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ q, index }) {
  const [show, setShow] = useState(false);

  const changeData = () => {
    setShow(!show);
  }

  return (
    <Card sx={{ width: '50%', margin: 'auto', direction: 'rtl' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          שאלה מספר {index}
        </Typography>
        <Typography variant="textarea" color="text.secondary">
          {q.q}
        </Typography>
        {show ? <Typography variant="body2" color="text.secondary" style={{ direction: 'ltr' }}>
          {q.answer}
        </Typography> : null}
      </CardContent>
      <CardActions>
        {!show ?
          <Button size="small" onClick={changeData}>show answer</Button>
          : null}
        {show ?
          <Button Button size="small" onClick={changeData}>hide answer</Button>
          : null}
      </CardActions>
    </Card>
  );
}