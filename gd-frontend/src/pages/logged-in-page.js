import React, { Component } from 'react';
import '../App.css';
import LoggedInNav from '../components/logged-in-navbar';
import bgImage from '../functions/bgImage'

const API = "http://127.0.0.1:3000";

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
