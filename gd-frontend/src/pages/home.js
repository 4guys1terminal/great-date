import React, { Component } from 'react';
import '../App.css';
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
}

export default Home;