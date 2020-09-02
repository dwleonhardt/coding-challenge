import React, { useState, createRef } from 'react';
import {Poll} from "../components/Poll";
// import {Button, Badge} from '@material-ui/core';
// import { Redirect } from "react-router-dom";


export default class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      polls: []
    }
  }
  componentDidMount() {
    fetch(`${this.props.api}/polls`).then(async res => {
      if (res.status === 200) {
        const polls = await res.json()
        this.setState({
          loading: false,
          polls
        })
      }
    })
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    };
    return (
      <div>
        {this.state.polls.map((poll) => <Poll key={poll.poll} poll={poll}/>)}
      </div>
    )
  };
};

