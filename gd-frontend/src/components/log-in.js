import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="login-wrapper">
                    <form className="login-form">
                        <div className="login-title">Great Date</div>
                        <input className="lname" placeholder="Phone number, username, or email"></input>
                        <input className="lname" placeholder="Password" type="password"></input>
                        <button className="login-btn">Log in</button>
                        <a className="forgot" href="#">
                            <p>Forgot password?</p>
                        </a>
                    </form>
                    <div className="sign-up">
                        <p className="sign-up-text"> Dont have an account? <Link
                            to='/sign-up-page'
                            id='sign-up-link'
                            className='sign-up-link'
                            >Sign Up</Link></p>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
