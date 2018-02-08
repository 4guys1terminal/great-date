import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    render() {
        return (
            <div>
                <div className="signup-wrapper">
                    <form className="signup-form">
                        <p className="signup-form-title">Great Date</p>
                        <p className="signup-form-blurb">Sign up to see photos and <br /> videos from your friends.</p>
                        <button className="use-fb">Log in with Facebook</button><div className="center">
                        <p className="or"><span className="hyphen1">______________</span>OR<span className="hyphen1">______________</span></p></div>

                        <input className="lname" placeholder="Mobile number or email" type="email"></input>
                        <input className="lname" placeholder="Full Name" type="username"></input>
                        <input className="lname" placeholder="Last Name" type="username"></input>
                        <input className="lname" placeholder="Password" type="password"></input>
                        <button className="login-btn">Sign up</button>
                        <a className="forgot" href="#">
                            <p className="agree">By signing up, you agree to our <br /> <span className="terms">Terms & Privacy Policy.</span></p>
                        </a>
                    </form>

                    <div className="login">
                        <p className="login-text">Have an account?
                            <Link
                                to='/login-page'
                                className='login-link'
                                id='login-link'
                                > Log In </Link>
                        </p>

                    </div>
                </div>

            </div>
        );
    }
}

export default SignUp;
