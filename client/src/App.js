import './App.css';
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import CustomNavbar from './Components/CustomNavbar';
import LandingSearchPage from './Components/LandingSearchPage';

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
      <div className="App">
        <CustomNavbar />
        <LandingSearchPage />
      </div>
    );
  }
}

export default App;
