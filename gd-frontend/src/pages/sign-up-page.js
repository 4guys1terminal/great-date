import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/navbar.js';
import SignUp from '../components/sign-up.js';

class SignUpPage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <SignUp />
            </div>
        );
    }
}

export default SignUpPage;
