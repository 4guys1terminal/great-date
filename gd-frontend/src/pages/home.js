import React, { Component } from 'react';
import '../App.css';
import Navigation from '../components/navbar.js';
import Title from '../components/title.js';
import TitleButton from '../components/title-button.js';
import BrowseDate from '../components/browse-dates.js';
import Grid from '../components/grid.js';
import SeeMoreBtn from '../components/see-more-btn.js';
import ReactDOM from "react-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <Navigation />
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
