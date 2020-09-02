import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import {Item} from "./Item";

export const Poll = (props) => {
  const {} = props;
  console.log(props.poll)

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.poll.title}
        </Typography>
        {props.poll.items.map((i) => <Item key={i.item} item={i} voteHandler={props.voteHandler}/>)}
      </CardContent>
    </Card>
  )
}
