//custom navbar
//shows login/signup if the user is logged in i.e. if the token is saved
//otherwise, shows logout
//Author: Zolboo Erdenebaatar
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import './CustomNavbar.css'
import authHeader from './../auth/authHeader'
import authService from './../auth/authService'

export default function LandingSearchPage(props) {
  const [loggedIn, changeLoggedIn] = useState(false);
  const [username, changeUsername] = useState(null);
  const [password, changePassword] = useState(null);
  const [errorMessage, changeError] = useState(null);
  const [successMessage, changeSuccess] = useState(null);

  useEffect(() => {
    var token = authHeader();
    //if it returns the token
    if (token["x-access-token"]) {
      changeLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    //delete the local token
    authService.logout();
    //change the state
    changeLoggedIn(false);
    changeError(null)
    changeSuccess(null)
  }

  function handleSignup(event) {
    event.preventDefault();
    if (!username || !password) {
      changeError("Please provide username and password to sign up");
    }
    else {
      authService.register(username, password).then(
        (data) => {
          changeSuccess("Account successfully created! You can now login")
          changeError(null)
        },
        error => {
          changeError("Username taken. Please try a different username")
          changeSuccess(null)
        }
      )
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!username || !password) {
      changeError("Please provide username and password to log in");
    }
    else {
      authService.login(username, password).then(
        (data) => {
          changeSuccess("Successfully logged in!")
          changeError(null)
          changeLoggedIn(true)
        },
        error => {
          changeError("Wrong username or password")
          changeSuccess(null)
        }
      )
    }
  }

  function handleUsername(event) {
    changeUsername(event.target.value);
  }

  function handlePassword(event) {
    changePassword(event.target.value);
  }

  return (
    <div className="Navbar">
      <div className="navbar" role="navigation" aria-label="main navigation">
        {/* {<div className="navbar-brand">
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>} */}

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" id="logo" href="/">
              Home
            </a>

            {/* {<a className="navbar-item">
              About
            </a>} */}
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {successMessage &&
              <span className="p-2 has-text-white has-background-success">
                {successMessage}
              </span>
            }
          </div>
          {loggedIn === false &&
            <div className="navbar-item">
              {errorMessage &&
                <span className="p-2 has-text-white has-background-danger">
                  {errorMessage}
                </span>
              }
              <div className="field m-2">
                <div className="control">
                  <input className="input is-normal" type="username" placeholder="Your Username" onChange={handleUsername} />
                </div>
              </div>
              <div className="field m-2">
                <div className="control">
                  <input className="input is-normal" type="password" placeholder="Your Password" onChange={handlePassword} />
                </div>
              </div>
              <div className="buttons">
                <div className="button is-primary" onClick={handleSignup}>
                  <strong>Sign up</strong>
                </div>
                <div className="button is-light" onClick={handleLogin}>
                  Log in
                </div>
              </div>
            </div>
          }
          {loggedIn &&
            <div className="navbar-item">
              <div className="buttons">
                <div className="button is-primary" onClick={handleLogout}>
                  <strong>Logout</strong>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}