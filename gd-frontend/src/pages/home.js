import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/navbar.js';
import TitleBlock from '../components/title-block.js';
import ReactDOM from "react-dom";
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Navigation from '../components/navbar';
import Title from '../components/title';
import TitleButton from '../components/title-button';
import BrowseDate from '../components/browse-dates';
import Grid from '../components/grid';
import LoggedIn from '../pages/logged-in-page';
import LoggedInNav from '../components/logged-in-navbar';

import bgImage from '../functions/bgImage'
import NavbarBootstrap from '../components/navbarBootstrap.js';

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            acitvities: [],
            tags: []
        }
    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavbarBootstrap />;
        } else {
            return < LoggedInNav />;
        }
    }

    render() {
        const { activities } = this.state

        return (
            <div className='home'>
              <div className="shadow">
                <div style={bgImage} className='titleBlock'>
                  {this.isUserLoggedIn()}

                  <TitleBlock/>

                </div>
              </div>

              <div style={backgroundTexture}>

                <div className="browse-title">
                  <Link to='/all-dates-page' id='all-dates-link' className='browse-title'>Browse Dates</Link>
                </div>

                    <div className="line-contain">
                        <div className="line"></div>
                    </div>

                    <Grid activities={activities} />

                    <div className="see-more-contain">
                        <Link to='/all-dates-page'>
                            <button className="see-more-btn">See More</button>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;
