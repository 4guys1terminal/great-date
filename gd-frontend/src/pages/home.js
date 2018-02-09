import React, { Component } from 'react';
import '../App.css';
import Navigation from '../components/navbar.js';
import Title from '../components/title.js';
import TitleButton from '../components/title-button.js';
import BrowseDate from '../components/browse-dates.js';
import Grid from '../components/grid.js';
import SeeMoreBtn from '../components/see-more-btn.js';
import ReactDOM from "react-dom";
import { Button } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div className='home'>
                < Navigation />
                < Title />
                < TitleButton />
                < BrowseDate />
                < Grid />
                < SeeMoreBtn />
                < Button />
            </div>
        );
    }
}

export default Home;
