import React, { Component } from 'react';

import variables from '../../tools/variables'

import LogIn from '../../components/log-in';
import NavbarBootstrap from '../../modules/NavBar/navbar-bootstrap';

import '../../../App.scss';


class LoginPage extends Component {
	render() {
		return (
			<div style={variables.backgroundStyle}>
				<NavbarBootstrap />
				<div className='login-page'>
					<LogIn />
				</div>
			</div>
		);
	}
}

export default LoginPage;
