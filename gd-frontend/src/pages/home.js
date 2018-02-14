import React, {Component} from 'react';
import '../App.css';
<<<<<<< HEAD
import Navigation from '../components/navbar';
import Title from '../components/title';
import TitleButton from '../components/title-button';
import BrowseDate from '../components/browse-dates';
import Grid from '../components/grid';
import SeeMoreBtn from '../components/see-more-btn';
import ReactDOM from "react-dom";
import LoggedIn from '../pages/logged-in-page';
import LoggedInNav from '../components/logged-in-navbar';

class Home extends Component {

isUserLoggedIn() {
  if (typeof localStorage.name === 'undefined') {
    return < Navigation />;
  } else {
    return < LoggedInNav />;
  }
}

  render() {

    return (
      <div>
        {this.isUserLoggedIn()}
        <Title />
        <TitleButton />
        <BrowseDate />
        <Grid />
        <SeeMoreBtn />
      </div>
    );
  }
=======
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
>>>>>>> master
}

export default Home;