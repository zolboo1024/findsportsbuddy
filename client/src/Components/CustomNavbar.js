import logo from './../logo.svg';
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
  }

  callAPI() {
  }

  componentWillMount() {
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
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                  Log in
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomNavbar;
