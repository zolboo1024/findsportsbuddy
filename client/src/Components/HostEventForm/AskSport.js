//Zolboo
//first step in the multi page form
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';

class AskSport extends Component {
    render() {
        //if wrong step, return null
        if (this.props.currentStep !== 1) {
            return null;
        }
        return (
            <div className="form-group">
                <label htmlFor="form">Sport</label>
                <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    value={this.props.email} // Prop: The email input data
                    onChange={this.props.handleChange} // Prop: Puts data into state
                />
            </div>
        )
    }
}