import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// TODO: remove these dependences/port over to MUI
import {
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';

import Controller from '../../../tools/Controller';

import FBlogin from '../fb-login';
import GoogleLogin from '../google-login';

import '../../../../App.scss';

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			form: {
				email: '',
				password: '',
			},
			errors: null,
			authorized: false,
			valid: true,
		};
	}

	/**
	authorize will fire on form submit. State will be set to
	the form values email and password and it will find a user
	WHERE email === form email and encrypt the password(backend), and check if
	it matches. If it does, set auth state === true.
	*/

	authorize = (e) => {
		e.preventDefault();
		const { email, password } = this.state.form;

		Controller.logUserIn({email: email, password: password})
			.then((data) => {
				if (data.message === "login success") {
					this.setState({ authorized: true })
				} else {
					this.setState({ valid: false })
				}
			})
	}

	handleChange = (e) => {
		const { form } = this.state;
		form[e.target.name] = e.target.value.trim(); // trims white space (spacebar)
		this.setState({form})
	}




	render() {
		const { authorized, form } = this.state;

		const login =
		(<div className="login-wrapper">
			<form className="login-form" onSubmit={this.authorize} onChange={this.handleChange.bind(this)}>

				<div className="login-title">Great Date</div>
				<div className="alert-holder">
					<span className="center">
						{!this.state.valid && <div className="alert alert-danger">Invalid username or password. Please try again</div>}
					</span>
				</div>
				<Row className="row">
					<Col xs={10}>
						<FormGroup id="email-form-group">
							<ControlLabel id="email"></ControlLabel>
							<FormControl placeholder="Email" type="text" name="email" value={this.state.form.email} onChange={this.handleChange.bind(this)}/>
						</FormGroup>
					</Col>
				</Row>
				<Row className="row">
					<Col xs={10}>
						<FormGroup id="password-form-group">
							<ControlLabel id="password"></ControlLabel>
							<FormControl placeholder="Password" type="password" name="password" value={this.state.form.password} onChange={this.handleChange.bind(this)}/>
						</FormGroup>
					</Col>
				</Row>

				<button className="login-btn" type="submit">
					Log in
				</button>
				<GoogleLogin />

				<FBlogin />

				{/* <a className="forgot" href="#">
					<p>Forgot password?</p>
					</a> */
				}
			</form>



			<div className="sign-up">
				<p className="sign-up-text">
					Dont have an account?
					<Link to='/sign-up-page' id='sign-up-link' className='sign-up-link'>
						<span> Sign Up</span></Link>
				</p>

			</div>
		</div>)
		return(
			<div>
				<div id="authorization">
				{/* noooooooo holy fuck this is bad */}
					{
						authorized
							? <Redirect to={"/"}/>
							: login
					}
					{
						authorized
							? localStorage.setItem('name', this.state.form.email)
							: null
					}

				</div>
			</div>
		);
	}
}

export default Login;
