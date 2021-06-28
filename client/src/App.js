import './App.css';
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import LandingSearchPage from './Components/LandingSearchPage';
import LoginPage from './Components/LoginPage';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    console.log("callAPI called");
    fetch("http://localhost:7000/firstAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
    console.log(this.state.apiResponse);
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/' component={LandingSearchPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
