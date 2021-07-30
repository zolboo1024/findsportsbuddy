//Entry point for the React app
//Zolboo
import './App.css';
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import LandingSearchPage from './Components/LandingSearchPage';
import LoginPage from './Components/LoginPage';
import HostEventPage from './Components/HostEventPage';
import DisplayMap from './Components/DisplayMap';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/hostEvent' component={HostEventPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/sportsMap' component={DisplayMap} />
          <Route path='/' component={LandingSearchPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
