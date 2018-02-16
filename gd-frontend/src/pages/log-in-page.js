import React, { Component } from 'react';
import '../App.css';
import LogIn from '../components/log-in.js';
import NavbarBootstrap from '../components/navbarBootstrap.js';
import bgImage from '../functions/bgImage'


var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};


class LoginPage extends Component {
    render() {
        return (
            <div style={bgImage}>
                < NavbarBootstrap />
                    <div className='login-page'>
                        <LogIn />
                    </div>
            </div>
        );
    }
}

export default LoginPage;
