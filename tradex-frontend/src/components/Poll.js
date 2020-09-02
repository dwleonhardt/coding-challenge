import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

export const Poll = (props) => {
  const {} = props;

  return (
    <Card onClick={props.onClick}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {payload.elements.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {payload.elements.body}
        </Typography>
      </CardContent>
    </Card>
  )
}
