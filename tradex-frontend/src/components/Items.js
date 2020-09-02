import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export const Item = (props) => {
  const {} = props;
  console.log(props.poll)

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.poll.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Votes
        </Typography>
      </CardContent>
    </Card>
  )
}