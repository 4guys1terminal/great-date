import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { TextField } from "@material-ui/core"

import Controller from '../../../tools/Controller';

import FBlogin from '../fb-login';
import GoogleLogin from '../google-login';

import '../../../../App.scss';
import './login.scss';

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
				<TextField 
					placeholder="Email" 
					type="text" 
					name="email" 
					className="input-field"
					value={this.state.form.email} 
					onChange={this.handleChange.bind(this)}
				/>
		
				<TextField 
					placeholder="Password" 
					type="password" 
					name="password" 
					className="input-field"
					value={this.state.form.password} 
					onChange={this.handleChange.bind(this)}
				/>

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
