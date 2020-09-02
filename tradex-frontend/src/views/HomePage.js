import React, { useState, createRef } from 'react';
// import {Button, Badge} from '@material-ui/core';
// import { Redirect } from "react-router-dom";


export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    fetch(`${this.props.api}/polls`).then(async res => {
      if (res.status === 200) {
        const polls = await res.json()
        console.log(polls)
      }
    })
  };

  render() {
    return (
      <div>
        {`${this.props.api}`}
      </div>
    );
  };

};

