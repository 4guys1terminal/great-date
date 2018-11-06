import React, { Component } from 'react';
import '../../App.css';
import LogIn from '../../components/log-in';
import NavbarBootstrap from '../../components/navbar-bootstrap';
import bgImage from '../../functions/bgImage'


class LoginPage extends Component {
    render() {
        return (
            <div style={bgImage}>
                <NavbarBootstrap />
                    <div className='login-page'>
                        <LogIn />
                    </div>
            </div>
        );
    }
}

export default LoginPage;
