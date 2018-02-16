import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    signOut() {
        localStorage.removeItem("name");
    }

    render() {
        return (
            <div>
              <nav className="navbar">
                <div className="logo"><a href="#">Great Date</a></div>

                <div className="nav-buttons">
                  <Link
                    to='/'
                    id='home-nav'
                  className='nav-btn1'>
                    Home
                  </Link>

                  <Link
                    to='/all-dates-page'
                    id='all-dates-nav'
                  className='nav-btn1'>
                    Browse Dates
                  </Link>

                  <Link
                    to='/'
                    className='nav-btn2'
                  id='login-link'>
                    {localStorage.name}
                  </Link>

                  <Link
                    to='/'
                    id='all-dates-nav'
                    className='nav-btn1'
                    onClick={this.signOut}>
                    Sign Out
                  </Link>
                </div>
              </nav>
            </div>
        );
    }
}

export default Navigation;
