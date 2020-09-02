import React from 'react';
import { Button } from '@material-ui/core';

export const Item = (props) => {
  const {} = props;
  console.log(props.item)

  return (
    <Button variant="outlined" color="default" onClick={async () => await props.voteHandler(props.item.item)}>
      {`${props.item.name} : ${props.item.votes}`}
      </Button>
  )
}