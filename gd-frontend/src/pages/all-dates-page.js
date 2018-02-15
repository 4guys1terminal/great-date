import React, { Component } from 'react';
import ActivitiesList from '../store/ActivitiesList';
import { Link } from 'react-router-dom';
import Grid from '../components/grid.js';

import DatePreview from '../components/date-preview';
import { Button } from 'react-bootstrap';
import NavBar from '../components/navbar';
import LoggedInNav from '../components/logged-in-navbar';

class AllDatesPage extends Component {
    componentWillMount() {
        this.setState({ activities: ActivitiesList });

    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavBar />;
        } else {
            return <LoggedInNav />;
        }
    }

    render() {
        return (
            <div>
                {this.isUserLoggedIn()}

                <div className="all-dates-page">

                    <h2>Browse All Dates</h2>

                    <br />

                    <ul>
                        <li>tag options</li>
                        <br />
                        <li>tag options</li>
                        <br />
                        <li>tag options</li>
                    </ul>

                    <br />

                    <Grid />

                    <Link to='/new-activity'> <Button className="newActivityButton" bsStyle="primary large">Create New Date</Button> </Link>
                </div>

            </div>
        );
    }
}

export default AllDatesPage;