//Entry point for the React app
//Author: Zolboo Erdenebaatar
import './App.css';
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import LandingSearchPage from './Components/LandingSearchPage';
import HostEventPage from './Components/HostEventPage';
import DisplayMap from './Components/DisplayMap';
import history from './history';
import { Switch, Router, Route } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/hostEvent' component={HostEventPage} />
          <Route path='/sportsMap' component={DisplayMap} />
          <Route path='/' component={LandingSearchPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
