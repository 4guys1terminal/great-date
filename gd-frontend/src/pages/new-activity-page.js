import React, { Component } from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom';

import AllDatesPage from './all-dates-page.js';
import NavBar from '../components/navbar.js';
import LoggedInNav from '../components/logged-in-navbar.js';
import NewActivityForm from '../components/new-activity-form.js';


const API = "http://localhost:3000"

class NewActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            activities: [],
            tags: [],
            newActivitySuccess: false,
            errors: null
        }
    }

    componentWillMount() {
        fetch(`${API}/activities`)
        .then((resp) =>{
            return resp.json()
        })
        .then((resp) =>{
            this.setState({activities: resp.activities})
        })

        fetch(`${API}/tags`)
        .then((resp) => {
          return resp.json()
        })
        .then((resp) => { this.setState({tags: resp.tags}) })
    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavBar />;
        } else {
            return <LoggedInNav />;
        }
    }

    handleNewActivity(params){
        fetch( `${API}/activities`,
            {
                method: "POST", //specifying our correct endpoint in the server
                headers: { //specifying that we're sending JSON, and want JSON back
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params), //stringifying json for the fetch
            }
        )
        .then((resp)=>{
            return resp.json()
        })
        .then((resp) =>{
            if(resp.errors){ //checking for any server side errors
                this.setState({errors: resp.errors})
            }else{
                const activities = Object.assign([], this.state.activities)
                const tags = Object.assign([], this.state.tags)
                activities.push(resp.activity) //add new activity to list of activities
                this.setState({
                    activities: activities, // update activities in state
                    tags: tags,
                    errors: null, // clear out any errors if they exist
                    newActivitySuccess: true
                })
            }
        })
    }

    render() {
        return (
            <div>

                {this.isUserLoggedIn()}

                <h1> Create a Date </h1>

                <NewActivityForm
                    onSubmit={this.handleNewActivity.bind(this)}
                    errors={this.state.errors && this.state.errors.validations}
                />

                {this.state.newActivitySuccess &&
                    <Redirect to="/success" />
                }

            </div>
        );
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
