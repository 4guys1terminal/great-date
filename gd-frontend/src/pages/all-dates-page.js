import React, { Component } from 'react';
import ActivitiesList from '../store/ActivitiesList.js';
import {Link} from 'react-router-dom';
import DatePreview from '../components/date-preview.js';
import { Button } from 'react-bootstrap';

class AllDatesPage extends Component {
    componentWillMount(){
        this.setState({activities: ActivitiesList})

    }

    render() {
        let list = this.state.activities.map(function(activity){
            return(
                < DatePreview
                id={activity.id}
                image={activity.image}
                title={activity.title}
                />
            )
        })

    return (
        <div className="all-dates-page">

            <h2>Browse All Dates</h2>

            <br/>

            <ul>
                <li>tag options</li>
                <br/>
                <li>tag options</li>
                <br/>
                <li>tag options</li>
            </ul>

            <br/>

            <ul className="container">
              {list}
            </ul>

            <Link to='/activities/new'> <Button className="newActivity-button" bsStyle="primary large">Create New Date</Button> </Link>

        </div>
    );
    }
}

export default AllDatesPage;
