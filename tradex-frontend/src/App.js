import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./views/HomePage";
const url = 'http://localhost:5000';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={() => <HomePage api={url}/>} />
      </Switch>
    </Router>
  );
}

export default App;
