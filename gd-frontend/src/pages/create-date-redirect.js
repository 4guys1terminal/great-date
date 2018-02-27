import React, {Component} from 'react';
import '../App.css';
import LogIn from '../components/log-in.js';
import NavbarBootstrap from '../components/navbar-bootstrap.js';
import bgImage from '../functions/bgImage'
import { Link } from 'react-router-dom';

class CreateDateRedirect extends Component {
    render() {
        return (
            <div style={bgImage}>

                <NavbarBootstrap />


                <h2 style={style}> Whoops! You have to be signed in to do that. </h2>

            <Link to='/login-page'>
                <button className='success-btns'><span>Log In/Sign Up</span></button>
            </Link>

            </div>
        );
    }
}

export default CreateDateRedirect;

const style = {
    color: 'white',
    marginTop: '25vh',
}
