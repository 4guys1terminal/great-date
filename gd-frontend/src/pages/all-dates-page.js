import React, {Component} from 'react';
import ActivitiesList from '../store/ActivitiesList';
import {Link} from 'react-router-dom';
import Grid from '../components/grid.js';

import DatePreview from '../components/date-preview';
import {Button, ButtonGroup, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import NavBar from '../components/navbar';
import LoggedInNav from '../components/logged-in-navbar';
import NavbarBootstrap from '../components/navbarBootstrap.js';
import bgImage from '../functions/bgImage'

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
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

    renderCreateButton() {
        if (typeof localStorage.name === 'undefined') {
            return <div>
                {
                    <Link to='/sign-up-page'> <Button className="newActivityButton" bsStyle="primary large">Create New Date</Button> </Link>
                }
            </div>
        } else {
            return <div>
                {
                    <Link to='/new-activity'> <Button className="newActivityButton" bsStyle="primary large">Create New Date</Button> </Link>
                }
            </div>
        }
    }

    renderCreateButton() {
        if (typeof localStorage.name === 'undefined') {
            return <div>
                {
                    <Link to='/sign-up-page'>
                            <Button className="newActivityButton" bsStyle="primary large">Create New Date</Button>
                        </Link>
                }
            </div>
        } else {
            return <div>
                {
                    <Link to='/new-activity'>
                            <Button className="newActivityButton" bsStyle="primary large">Create New Date</Button>
                        </Link>
                }
            </div>
        }
    }

    render() {
        return (<div>
            <div style={bgImage}>

                {this.isUserLoggedIn()}

                <div>

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

                    <div style={backgroundTexture} className='all-dates-page'>

                        <Grid/>

                        {this.renderCreateButton()}
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default AllDatesPage;
