import React, { Component } from 'react';
import '../App.css';
import LogIn from '../components/log-in.js';
import NavBar from '../components/navbar.js';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <LogIn />
            </div>
        );
    }
}

export default LoginPage;
