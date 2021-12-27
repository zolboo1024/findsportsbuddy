//Service class that does Login and Register requests
//and save the returned info into a user item in the
//local storage including the user id and accesstoken

//Author: Zolboo Erdenebaatar
import axios from "axios";
var CONFIG = require('./../config.json');
const API_URL = CONFIG.API_URL;

class authService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
    }

    register(username, password) {
        return axios
            .post(API_URL + "register", {
                username,
                password
            })
            .then(response => {
                return response.data
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new authService();