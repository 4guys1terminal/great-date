// React Imports
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Globals
import variables from '../../tools/variables';
import Controller from '../../tools/Controller';

// Modules && General Components
import LoggedInNav from '../../modules/nav-bar/logged-in-navbar';
import NavbarBootstrap from '../../modules//nav-bar/navbar-bootstrap';

// Component Specfic Imports
import NewDateForm from './components/new-date-form'

// Styles
import '../../../App.scss';

// Documentation/Notes

const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'


class NewDate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            tags: [],
            locations: [],
            newActivitySuccess: false,
            errors: null
        }
    }

	//TODO: replace all of these with controller calls
	componentDidMount() {
		console.log('cdm');
		Controller.fetchAllActivities()
			.then((resp) => {
				this.setState({activities: resp.activities})
			})

		Controller.fetchTags()
			.then((resp) => {
				this.setState({tags: resp.tags})
			})

		Controller.fetchLocations()
			.then((resp) => {
				this.setState({locations: resp.tags})
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
	handleNewActivity(params) {
		fetch(`${API}/api/activities`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params),
		}).then((resp) => {
			return resp.json()
		}).then((resp) => {
			if (resp.errors) {
				console.log("errors",resp.errors);

				this.setState({errors: resp.errors})
			} else {
				const activities = Object.assign([], this.state.activities)
				const tags = Object.assign([], this.state.tags)
				const locations = Object.assign([], this.state.locations)

				// QUESTION: what is happening here... why does the activity get pushed within the component? shouldn't this be reaching into the backend to get the activity?
				activities.push(resp.activity) //add new activity to list of activities
				this.setState({
					activities: activities, // update activities in state
					tags: tags,
					locations: locations,
					errors: null, // clear out any errors if they exist
					newActivitySuccess: true
				})
			}
		})
	}

	render() {
		return (
			<div className='create-div' >

				<div style={variables.backgroundStyle}>

					{this.isUserLoggedIn()}

					<h1>Create a Date</h1>

					<NewDateForm
						onSubmit={this.handleNewActivity.bind(this)}
						errors={this.state.errors && this.state.errors.validations}
					/>

					{this.state.newActivitySuccess &&
						<Redirect to="/success" />
					}

				</div>
			</div>
		);
	}
}

export default NewDate;
