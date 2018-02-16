import React, {Component} from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';

import AllDatesPage from './all-dates-page.js';
import LoggedInNav from '../components/logged-in-navbar.js';
import NavbarBootstrap from '../components/navbarBootstrap.js';

import NewActivityForm from '../components/new-activity-form.js';

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

var bgImage = {
    backgroundImage: 'linear-gradient(to bottom, rgb(13,194,181) 0%, rgb(13,186,237) 100%)',
    backgroundSize: 'cover',
};

const API = "http://localhost:3000"

class NewActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            tags: [],
            locations: [],
            newActivitySuccess: false,
            errors: null,
        }
    }

    componentWillMount() {
        fetch(`${API}/activities`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({activities: resp.activities})
        })

        fetch(`${API}/tags`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({tags: resp.tags})
        })

        fetch(`${API}/locations`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({locations: resp.tags})
        })

    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavbarBootstrap />;
        } else {
            return <LoggedInNav/>;
        }
    }

    handleNewActivity(params) {
        fetch(`${API}/activities`, {
            method: "POST", //specifying our correct endpoint in the server
            headers: { //specifying that we're sending JSON, and want JSON back
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((resp) => { //stringifying json for the fetch
            return resp.json()
        }).then((resp) => {
            if (resp.errors) { //checking for any server side errors
                this.setState({errors: resp.errors})
            } else {
                const activities = Object.assign([], this.state.activities)
                const tags = Object.assign([], this.state.tags)
                const locations = Object.assign([], this.state.locations)
                activities.push(resp.activity) //add new activity to list of activities
                this.setState({
                    activities: activities, // update activities in state
                    tags: tags,
                    locations: locations,
                    errors: null, // clear out any errors if they exist
                    newActivitySuccess: true,
                })
            }
        })
    }

    render() {
        return (<div style={bgImage}>
            {this.isUserLoggedIn()}

            <h1>
                Create a Date
            </h1>

            <NewActivityForm onSubmit={this.handleNewActivity.bind(this)} errors={this.state.errors && this.state.errors.validations}/> {/* {this.state.newActivitySuccess &&
                    <Redirect to="/success" />
                } */
            }

        </div>);
    }
}

export default NewActivity;

//
// function getTags() {
//
// }
//
// function getActivities() {
//
// }
