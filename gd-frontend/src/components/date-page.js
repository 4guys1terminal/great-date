import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../logo.svg';
import '../App.css';
import ActivitiesList from '../store/ActivitiesList.js';
import DateInfo from './date-info.js';

class DatePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            activities: ActivitiesList
        }
    }

    componentWillMount(){
        const id = this.props.match.params.id;
        this.setState({activityId: id})
        let activity = this.state.activities.find(function(activity){
            return activity.id === parseInt(id)
        })
        if(activity){
            this.setState({activity: activity})
        }
    }

    render() {
        return (
            <div className="date-page">
                <h1>{this.state.activity.title}</h1>

                <img class="activityPic" src={`${this.state.activity.image}`} />

                <h3>{this.state.activity.title}</h3>

                <DateInfo
                    description={this.state.activity.description}
                    location={this.state.activity.location}
                    cost={this.state.activity.cost}
                />


            </div>
        );
    }
}

export default DatePage;
