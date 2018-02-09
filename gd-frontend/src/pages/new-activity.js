import React, { Component } from 'react';
import '../App.css';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    Row,
    HelpBlock,
    Alert,
    Checkbox
} from 'react-bootstrap';
import AllDatesPage from './all-dates-page.js';
import NavBar from '../components/navbar.js';
import NewActivityForm from '../components/new-activity-form.js';

class NewActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            apiUrl: "http://localhost:3000",
            activities: [],
            newActivitySuccess: false,
            errors: null
        }
    }

    componentWillMount(){
        fetch(`${this.state.apiUrl}/activities`)
        .then((rawResponse) =>{
            return rawResponse.json()
        })
        .then((parsedResponse) =>{
            this.setState({activities: parsedResponse.activities})
        })
    }

    handleNewActivity(params){
        fetch( `${this.state.apiUrl}/activities`,
            {
                body: JSON.stringify(params), //stringifying json for the fetch
                headers: { //specifying that we're sending JSON, and want JSON back
                    'Content-Type': 'application/json'
                },
                method: "POST" //specifying our correct endpoint in the server
            }
        )
        .then((rawResponse)=>{
            return rawResponse.json()
        })
        .then((parsedResponse) =>{
            if(parsedResponse.errors){ //checking for any server side errors
                this.setState({errors: parsedResponse.errors})
            }else{
                const activities = Object.assign([], this.state.activities)
                activities.push(parsedResponse.activity) //add new activity to list of activities
                this.setState({
                    activities: activities, // update activities in state
                    errors: null, // clear out any errors if they exist
                    newActivitySuccess: true
                })
            }
        })
    }


    render() {
        return (
            <div>

                <NavBar />

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
