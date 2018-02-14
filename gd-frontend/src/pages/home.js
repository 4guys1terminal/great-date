import React, {Component} from 'react';
import '../App.css';
import NavBar from '../components/navbar.js';
import TitleBlock from '../components/title-block.js';
import Grid from '../components/grid.js';
import ReactDOM from "react-dom";
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom'

class Home extends Component {
    render() {
        return (<div className='home'>

            < NavBar/>

            < TitleBlock/>


            <div className="line-contain">
                <div className="line"></div>
            </div>

            <div className="browse-title">
                <Link
                    to='/all-dates-page'
                    id='all-dates-link'
                    className='browse-title'
                    >Browse Dates</Link>
            </div>


            < Grid/>

            <div className="see-more-contain">
                <Link
                    to='/all-dates-page'
                    id='all-dates-nav'
                    className='nav-btn1'>
                    <button className="see-more-btn" id="pg2">See More</button>
                </Link>
            </div>

        </div>);
    }
}

export default Home;
