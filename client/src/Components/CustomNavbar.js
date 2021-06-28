//custom navbar
//shows login/signup if the user is logged in i.e. if the token is saved
//otherwise, shows logout
//Zolboo
import logo from './../logo.svg';
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import authHeader from './../auth/authHeader'
import authService from './../auth/authService'

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    //delete the local token
    authService.logout();
    //change the state
    this.setState({ loggedIn: false });
  }
  componentWillMount() {
    var token = authHeader();
    //if it returns the token
    if (token["x-access-token"]) {
      this.setState({ loggedIn: true });
    }
  }
  render() {
    return (
      <div className="Navbar">
        <div class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="#">
              <img src={logo} width="112" height="28"></img>
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">
                Home
              </a>

              <a class="navbar-item">
                About
              </a>
            </div>
          </div>

          <div class="navbar-end">
            {this.state.loggedIn == false &&
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a class="button is-light" href="/login">
                    Log in
                  </a>
                </div>
              </div>
            }
            {this.state.loggedIn &&
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary" onClick={this.handleLogout}>
                    <strong>Logout</strong>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CustomNavbar;
