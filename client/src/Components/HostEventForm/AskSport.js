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
        if (this.state.selected != sport) {
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
                <h1 class="title has-text-centered">What sport would you like to play?</h1>
                <div class="container">
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
                                                        <header class="card-header">
                                                            <p class="card-header-title">
                                                                {curName}
                                                            </p>
                                                        </header>
                                                        <div class="card-image">
                                                            <figure class="image m-4">
                                                                {this.state.selected == curName ?
                                                                    <img src={window.location.origin + "/svgs/check.svg"} alt="Placeholder image"></img>
                                                                    :
                                                                    <img src={window.location.origin + curURL} alt="Placeholder image"></img>
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
                {
                    this.state.selected &&
                    <div>
                        <img src={window.location.origin + "/svgs/rightarrow.svg"} alt="Placeholder image" align="right"></img>
                    </div>
                }
            </div>
        )
    }
}

export default AskSport;