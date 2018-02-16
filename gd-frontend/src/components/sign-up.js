import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Row, Col, FormGroup, ControlLabel, HelpBlock, FormControl, Button } from 'react-bootstrap';
import {
    validatePresence,
    validateLength,
    validateEmail,
    validateNumeric,
    validatePassword,
    addError,
 } from './RegistrationStore';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registration: {
                firstName: '',
                lastName: '',
                email: '', 
                password: '',
            },
            errors: props.errors || []
        };
    }

    handleChange(e) {
        const target = e.target
        const registration = this.state.registration
        registration[target.name] = target.value
        this.setState({
            registration: registration
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const { onSubmit } = this.props;
        const { registration } = this.state;

        let errors = this.validate()
        if(errors.length > 0) {
            // do something to show they can't submit
            this.setState({
                errors: errors
            })

            return
        }

        if (onSubmit) {
            onSubmit(registration)
        }
    }

    validate() {
        let { registration, errors } = this.state

        errors = validatePresence(errors, registration, 'firstName')
        errors = validatePresence(errors, registration, 'lastName')
        errors = validatePresence(errors, registration, 'email')
        errors = validatePresence(errors, registration, 'password')

        return errors
    }

    render() {
        const { registration, errors } = this.state
        const { firstName, lastName, email, password } = registration

        return (
            <div>
                <div className="signup-wrapper" >
                    <form className="signup-form" onSubmit={this.handleSubmit.bind(this)}>
                        <p className="signup-form-title">Great Date</p>
                        <p className="signup-form-blurb">Sign up and share unique date ideas</p>
                        <div className="alert-holder">
                            <span className="center">
                                {errors.length > 0 &&
                                    <div className="alert alert-danger">Please verify that all fields are correctly filled</div>
                                }
                            </span>
                        </div>

                    <Row className="row row1">
                        <Col xs={10}>
                            <FormGroup>
                                <FormControl
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={this.handleChange.bind(this)}
                                    value={firstName}
                                    errors={errors.firstName}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="row">
                        <Col xs={10}>
                            <FormGroup>
                                <FormControl
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={this.handleChange.bind(this)}
                                    value={lastName}
                                    errors={errors.lastName}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="row">
                        <Col xs={10}>
                            <FormGroup>
                                <FormControl
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange.bind(this)}
                                    value={email}
                                    errors={errors.email}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="row">
                        <Col xs={10}>
                            <FormGroup>
                                <FormControl
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChange.bind(this)}
                                    value={password}
                                    errors={errors.password}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                        <Col xs={10} className="row">
                            <button
                                id="submit"
                                className="create-account"
                                onSubmit={this.handleSubmit.bind(this)}
                            >
                                Create Account
                            </button>

                        </Col>
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
