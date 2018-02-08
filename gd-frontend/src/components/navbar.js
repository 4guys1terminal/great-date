import React, { Component } from 'react';
import '../App.css';

class Navigation extends Component {
    render() {
        return (
            <div>
                <nav class="navbar">
                    <div class="logo"><a href="#">Great Date</a></div>
                    <div class="nav-buttons">
                        <a href="#"><div className="nav-btn1">Browse Dates</div></a>
                        <a href="#"><div className="nav-btn2">Log In / Sign Up</div></a>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;
