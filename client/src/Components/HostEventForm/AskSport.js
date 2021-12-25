//Zolboo
//first step in the multi page form
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import CustomNavbar from '../CustomNavbar';
import sportsCards from './sportsCards';
class AskSport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            emojis: sportsCards
        }
        this.handleSelection = this.handleSelection.bind(this);
    }
    //toggle the selection
    handleSelection(sport) {
        //if already selected, unselect it
        if (this.state.selected !== sport) {
            this.setState({ selected: sport });
        }
        else {
            this.setState({ selected: '' });
        }
        this.props.onSportChange(sport);
    }
    render() {
        //map the sports into cards
        //they are separated into cols
        //map into cols and for each col, map into 4 cards each
        return (
            <div>
                <CustomNavbar />
                <h1 class="title has-text-centered">What sport do you plan to play?</h1>
                <div class="container m-auto">
                    {
                        this.state.selected &&
                        <input
                            type="image"
                            alt="selected"
                            src={window.location.origin + "/svgs/rightarrow.svg"}
                            align="right"
                            onClick={this.props.nextStep}>
                        </input>
                    }
                    <div id="cards" class="columns is-multiline is-mobile">
                        {
                            this.state.emojis &&
                            this.state.emojis.map(
                                (curCol, curIndex) => {
                                    return <div class="column is-one-quarter" key={curIndex}>
                                        {curCol.map(
                                            (curCard, curCardIndex) => {
                                                const curName = curCard.name;
                                                const curURL = curCard.emojiUrl;
                                                return <div class="container m-6">
                                                    <div class="card" key={curName} onClick={() => this.handleSelection(curName)}>
                                                        <div class="card-header">
                                                            <p class="card-header-title">
                                                                {curName}
                                                            </p>
                                                        </div>
                                                        <div class="card-image">
                                                            <figure class="image m-4">
                                                                {this.state.selected === curName ?
                                                                    <img src={window.location.origin + "/svgs/check.svg"} alt="Checked"></img>
                                                                    :
                                                                    <img src={window.location.origin + curURL} alt="Checked"></img>
                                                                }
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        )}
                                    </div>
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AskSport;