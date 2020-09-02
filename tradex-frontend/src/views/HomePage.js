import React, { useState, createRef } from 'react';
import {Poll} from "../components/Poll";
// import {Button, Badge} from '@material-ui/core';
// import { Redirect } from "react-router-dom";
import { URL } from '../App'


export default class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      polls: []
    }

    this.getPolls = this.getPolls.bind(this)
  }
  componentDidMount() {
    this.getPolls()
  };

  getPolls() {
    fetch(`${URL}/polls`).then(async res => {
      if (res.status === 200) {
        const polls = await res.json()
        this.setState({
          loading: false,
          polls
        })
      }
    })
  }

  voteHandler(itemId) {
    fetch(`${URL}/vote`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId })
    }).then(async res => {
      // const polls = await this.getPolls()
      // this.setState({
      //   loading: false,
      //   polls
      // })
    });
  }

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
        {this.state.polls.map((poll) => <Poll key={poll.poll} poll={poll} voteHandler={this.voteHandler}/>)}
      </div>
    )
  };
};

