// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Globals
import variables from '../../tools/variables'

// Modules && General Components
import LoggedInNav from '../../components/logged-in-navbar';
import NavbarBootstrap from '../../components/navbar-bootstrap.js';
import { Button } from 'react-bootstrap';

// Component Specfic Imports
import DateController from '../../controllers/DateController';
import DateComponent from '../../components/date-component.js';

// Styles
import '../../../App.scss';

// Documentation/Notes


class DatePage extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		const { id } = this.props.match.params

		DateController.fetchActivity(id).then((res) => {
			const { activity } = res

			if(!activity) {
				return
			}

			this.setState({activity: activity})
		}).catch(e => console.log('mount catch:', e))
	}

	isUserLoggedIn() {
		if (typeof localStorage.name === 'undefined') {
			return < NavbarBootstrap />;
		} else {
			return < LoggedInNav />;
		}
	}

	render() {
		const { activity } = this.state;


		if (!activity) {
			return (
				<div className="container">
					<div className="grid">
						<h1>Loading...</h1>
					</div>
				</div>
			)
		}

		return (
			<div style={variables.backgroundStyle}>
				<div className='datePageTest'>
					{this.isUserLoggedIn()}

					<DateComponent
						id={this.state.activity.id}/>

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
