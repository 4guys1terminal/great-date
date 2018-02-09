import React, { Component } from 'react';
import ActivitiesList from '../store/ActivitiesList.js';
import {Link} from 'react-router-dom';
import DatePreview from '../components/date-preview.js';
import { Button } from 'react-bootstrap';
import NavBar from '../components/navbar.js';
import Grid from '../components/grid.js';

class AllDatesPage extends Component {
    componentWillMount(){
        this.setState({activities: ActivitiesList})

    }

    render() {
        return (
            <div>

                <NavBar />

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

                    <Grid />

                    <Link to='/new-activity'> <Button className="newActivityButton" bsStyle="primary large">Create New Date</Button> </Link>
                </div>

            </div>
        );
    }
}

export default AllDatesPage;
