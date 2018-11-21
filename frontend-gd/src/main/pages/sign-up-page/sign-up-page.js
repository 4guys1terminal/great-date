// React Imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Globals
import variables from '../../tools/variables';
import Controller from '../../tools/Controller';

// Modules && General Components
import NavbarBootstrap from '../../modules/nav-bar/navbar-bootstrap.js';

// Component Specfic Imports
import SignUp from './sign-up';

// Styles
import '../../../App.scss';

// Documentation/Notes


//TODO: add USER controller and export all user related API calls
class SignUpPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			errors: [],
			newUserSuccess: false,
			email: ''
		};

		this.handleNewUser = this.handleNewUser.bind(this)
	}

	componentDidMount() {
		Controller.fetchAllUsers()
			.then((res) => {
				this.setState({ users: res.users });
			})
			.catch(e => console.log(e))
	}

	handleNewUser(params) {
		Controller.createUser(params)
			.then((res) => {
				if (res.errors) {
					this.setState({
						errors: res.errors
					})
					console.log("errors", this.state.errors.validations);
				} else {
					localStorage.setItem('name', this.state.email);
					// NOTE: see if this works
					this.props.history.push('/')
				}
			})
			.catch(e => console.log(e));
	}

	render() {
		return (
			<div style={variables.backgroundStyle}>
				<NavbarBootstrap />
				<SignUp
					onSubmit={this.handleNewUser}
					errors={this.state.errors}
				/>
			</div>
		);
	}
}

export default SignUpPage;
