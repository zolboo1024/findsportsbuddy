//React Login Page for the app
//calls the authService to login and save the
//token. If it is not validated, it returns an error message
//Zolboo
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import authService from './../auth/authService';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handlErrorMessage = this.handlErrorMessage.bind(this);
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        //validate the username and password
        //if it works, save the jwt in the local storage
        authService.login(this.state.username, this.state.password).then(
            () => {
                //go to the home page
                this.props.history.push("/");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    errorMessage: resMessage
                });
            }
        )
    }

    //if the auth returns an error message
    handlErrorMessage(message) {
        this.setState({ errorMessage: message });
    }

    render() {
        return (
            <div className="Login">
                <section class="hero is-success is-fullheight">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <div class="column is-4 is-offset-4">
                                <h3 class="title has-text-black">Login</h3>
                                <hr class="login-hr" />
                                <p class="subtitle has-text-black">Please login to proceed.</p>
                                <div class="box">
                                    {this.state.errorMessage &&
                                        <div class="notification is-danger">
                                            Invalid Credentials.
                                        </div>
                                    }
                                    <form>
                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-large" type="username" placeholder="Your Username" value={this.state.username} onChange={this.handleUsername} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="control">
                                                <input class="input is-large" type="password" placeholder="Your Password" value={this.state.password} onChange={this.handlePassword} />
                                            </div>
                                        </div>
                                        <button class="button is-block is-info is-large is-fullwidth" onClick={this.handleSubmit}>Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                                <p class="has-text-grey">
                                    <a href="../">Sign Up</a> &nbsp;·&nbsp;
                                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                        <a href="../">Need Help?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LoginPage;
