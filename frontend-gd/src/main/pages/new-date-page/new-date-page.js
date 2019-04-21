// React Imports
import React, { Component } from 'react';

// Globals
import variables from '../../tools/variables';
import Controller from '../../tools/Controller';

// Modules && General Components
import LoggedInNav from '../../modules/nav-bar/logged-in-navbar';
import NavbarBootstrap from '../../modules//nav-bar/navbar-bootstrap';

// Component Specfic Imports
import NewDateForm from './components/new-date-form';

// Styles
import '../../../App.scss';

// Documentation/Notes


class NewDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            tags: [],
            locations: [],
            newActivitySuccess: false,
            errors: null
        };

		this.handleNewActivity = this.handleNewActivity.bind(this);
    }

	componentDidMount() {
		Controller.fetchAllActivities()
			.then(({activities}) => {
				this.setState({activities})
			})

		Controller.fetchTags()
			.then(({tags}) => {
				this.setState({tags})
			})

		// TODO: take a look at this variable name in the API response
		Controller.fetchLocations()
			.then(({tags}) => {
				this.setState({locations: tags})
			})
	}

	//TODO: export to top level
    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return <NavbarBootstrap />;
        } else {
            return <LoggedInNav/>;
        }
    }

	// fxn that creates new activity
	handleNewActivity(dateData) {
		Controller.createNewActivity(dateData)
			.then((resp) => {
				this.props.history.push({pathname: '/success'});
			})
	}

	render() {
		return (
			<div className='create-div' >
				<div style={variables.backgroundStyle}>
					{this.isUserLoggedIn()}

					<h1>Create a Date</h1>

					<NewDateForm
						onSubmit={this.handleNewActivity}
						errors={this.state.errors && this.state.errors.validations}
					/>
				</div>
			</div>
		);
	}
}

export default NewDate;
