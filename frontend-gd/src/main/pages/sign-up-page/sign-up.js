import React, {Component} from 'react';
import '../../../App.scss';

import {Link} from 'react-router-dom';
//TODO:
import {
	Row,
	Col,
	FormGroup,
	FormControl
} from 'react-bootstrap';

import RegistrationStore from '../../tools/registration-store';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registration: RegistrationStore.getFields(),
            errors: {},
        };
    }

    handleChange(e) {
        const target = e.target
        const registration = this.state.registration
        registration[target.name] = target.value
        this.setState({registration: registration})
    }

    handleSubmit(e) {
        e.preventDefault();

        const {onSubmit} = this.props;
        const {registration} = this.state;
        this.validate()
        if (onSubmit) {
            onSubmit(registration)
        } else {
            console.log("no onSubmit props passed");
        }
    }

    isValid() {
        return Object.keys(this.state.errors).length === 0
    }

    validate() {
        RegistrationStore.validate()
        this.setState({errors: RegistrationStore.getErrors()})
    }

    validatePresence(fieldName) {
        if (this.fields[fieldName] === '') {
            this.addError(fieldName, 'is Required')
        }
    }

    addError(fieldName, message) {
        this.errors[fieldName] = message
    }

    render() {
        return (
            <div>
                <div className="signup-wrapper">
                    <form className="signup-form" onSubmit={this.handleSubmit.bind(this)}>
                        <p className="signup-form-title">Great Date</p>
                        <p className="signup-form-blurb">Sign up and share unique date ideas</p>
                        <div className="alert-holder">
                            <span className="center">
                                {!this.isValid() && <div className="alert alert-danger">Please verify that all fields are correctly filled out</div>}
                            </span>
                        </div>

                        <Row className="row row1">
                            <Col xs={10}>
                                <FormGroup >
                                    <FormControl name="firstName" type="text" placeholder="First Name" onChange={this.handleChange.bind(this)} value={this.state.registration.firstName} errors={this.state.errors.firstName}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col xs={10}>
                                <FormGroup>
                                    <FormControl name="lastName" type="text" placeholder="Last Name" onChange={this.handleChange.bind(this)} value={this.state.registration.lastName} errors={this.state.errors.lastName}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col xs={10}>
                                <FormGroup>
                                    <FormControl name="email" type="email" placeholder="Email" onChange={this.handleChange.bind(this)} value={this.state.registration.email} errors={this.state.errors.email}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col xs={10}>
                                <FormGroup>
                                    <FormControl name="password" type="password" placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.registration.password} errors={this.state.errors.password}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Col xs={10} className="row">
                            <button onSubmit={this.handleSubmit.bind(this)} id="" type="submit" className="create-account">Create Account</button>

                        </Col>

                        <a className="forgot" target="_blank" rel="noopener noreferrer" href="https://termsfeed.com/privacy-policy/fc335ac239bf69e28f95d5e7104179cc">
                            <p className="agree">By signing up, you agree to our
                                <br/>
                                <span className="terms">Terms & Privacy Policy.</span>
                            </p>
                        </a>

                    </form>

                    <div className="login">
                        <p className="login-text">Have an account?
                            <Link to='/login-page' className='login-link' id='login-link'>
                              <span> Log In</span>
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default SignUp;
