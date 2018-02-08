import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav class="navbar">
                    <div class="logo"><a href="#">Great Date</a></div>

                    <div class="nav-buttons">
                        <Link
                            to='/'
                            id='home-nav'
                            className='nav-btn1'
                            >Home</Link>

                        <Link
                            to='/all-dates-page'
                            id='all-dates-nav'
                            className='nav-btn1'
                            >Browse Dates</Link>

                        <Link
                            to='/login-page'
                            className='nav-btn2'
                            id='login-link'
                            > Log In / Sign Up</Link>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;
