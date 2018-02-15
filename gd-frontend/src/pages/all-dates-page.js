import React, {Component} from 'react';
import ActivitiesList from '../store/ActivitiesList';
import {Link} from 'react-router-dom';
import Grid from '../components/grid.js';

import DatePreview from '../components/date-preview';
import {Button, ButtonGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import NavBar from '../components/navbar';
import LoggedInNav from '../components/logged-in-navbar';
import NavbarBootstrap from '../components/navbarBootstrap.js';

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

var bgImage = {
    backgroundImage: 'linear-gradient(to bottom, rgb(13,194,181) 0%, rgb(13,186,237) 100%)',
    backgroundSize: 'cover'
};

class AllDatesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gridLimit: null
        }
    }

    componentWillMount() {
        this.setState({activities: ActivitiesList});

    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return <NavbarBootstrap/>;
        } else {
            return <LoggedInNav/>;
        }
    }

    render() {
        return (<div>
            <div style={bgImage}>

                {this.isUserLoggedIn()}

                <div className="all-dates-page">

                    <h1>Browse All Dates</h1>

                    {/* <ToggleButtonGroup type="checkbox" bsSize='large' className="search-tags">
                    <ToggleButton value={1}>Romantic</ToggleButton>
                    <ToggleButton value={2}>Thrilling</ToggleButton>
                    <ToggleButton value={3}>Outdoors</ToggleButton>
                    <ToggleButton value={4}>Fancy</ToggleButton>
                    <ToggleButton value={5}>Morning</ToggleButton>
                    <ToggleButton value={6}>Afternoon</ToggleButton>
                    <ToggleButton value={7}>Evening</ToggleButton>
                </ToggleButtonGroup> */
                    }

                    <div style={backgroundTexture}>

                        <Grid gridLimit='null'/>

                        <Link to='/new-activity'>
                            <Button className="newActivityButton" bsStyle="primary" bsSize="large">Create New Date</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default AllDatesPage;
