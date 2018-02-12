import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../App.css';
import ActivitiesList from '../store/ActivitiesList.js';
import DateInfo from '../components/date-info.js';
import NavBar from '../components/navbar.js';

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
            <div>

                <NavBar/>

                <div className="date-page">

                    <h1>{this.state.activity.title}</h1>

                    <img class="activityPic" src={`${this.state.activity.image}`} alt="date"/>

                    <h3>{this.state.activity.title}</h3>

                    <DateInfo
                        description={this.state.activity.description}
                        location={this.state.activity.location}
                        cost={this.state.activity.cost}
                    />

                    <Link
                        to='/all-dates-page'
                        id='all-dates-back'
                        className='back-button'
                        ><Button className="back-button" bsStyle="primary large">Back</Button>
                    </Link>

                </div>
            </div>
        );
    }
}

export default DatePage;
