import React from 'react';
import { Button } from '@material-ui/core';

export const Item = (props) => {
  const {} = props;
  console.log(props.poll)

  return (
    <Button variant="outlined" color="default" onClick={console.log('click')}>
      {`${this.props.item.name} : ${this.props.item.vote}`}
      </Button>
  )
}