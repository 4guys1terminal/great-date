import React, { Component } from 'react';
import '../App.css';
import LoggedInNav from '../components/logged-in-navbar';
import bgImage from '../functions/bgImage'


class LoggedIn extends Component {

    render() {
        return (
            <div style={bgImage}>
                <LoggedInNav />

            </div>
        );
    }
}

export default LoggedIn;
