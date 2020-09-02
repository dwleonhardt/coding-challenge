import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./views/HomePage";
export const URL = 'http://localhost:5000';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={() => <HomePage/>} />
      </Switch>
    </Router>
  );
}

export default App;
