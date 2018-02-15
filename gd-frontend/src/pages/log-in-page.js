import React, { Component } from 'react';
import '../App.css';
import LogIn from '../components/log-in.js';
import NavbarBootstrap from '../components/navbarBootstrap.js';


var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

var bgImage = {
    backgroundImage: 'linear-gradient(to bottom, rgb(13,194,181) 0%, rgb(13,186,237) 100%)',
    backgroundSize: 'cover'
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
