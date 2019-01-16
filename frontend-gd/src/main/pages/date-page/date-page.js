// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Globals
import variables from '../../tools/variables';

// Modules && General Components
import { Button } from 'react-bootstrap';
import LoggedInNav from '../../modules/nav-bar/logged-in-navbar';
import NavbarBootstrap from '../../modules//nav-bar/navbar-bootstrap';

// Component Specfic Imports
import DateComponent from '../../modules/date-component';

// Styles
import '../../../App.scss';

// Documentation/Notes

class DatePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activity: {},
		};
	}

	isUserLoggedIn() {
		if (typeof localStorage.name === 'undefined') {
			return < NavbarBootstrap />;
		} else {
			return < LoggedInNav />;
		}
	}

	render() {
		return (
			<div style={variables.backgroundStyle}>
				<div className='datePageTest'>
					{this.isUserLoggedIn()}

					<DateComponent id={this.props.match.params.id}/>

					<Link
						to='/browse-dates'
						id='browse-dates-back'
						className='back-button'
					>
						<Button
							className='back-button'
							bsStyle='primary'
							bsSize='large'
						>
							Back
						</Button>
					</Link>
				</div>
			</div>
		);
	}
}

export default DatePage
