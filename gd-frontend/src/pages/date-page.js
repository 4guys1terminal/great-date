import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import '../App.css';
import ActivitiesList from '../store/ActivitiesList.js';
import DateInfo from '../components/date-info.js';
import NavBar from '../components/navbar.js';
import NavbarBootstrap from '../components/navbarBootstrap.js'

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

var bgImage = {
    backgroundImage: 'linear-gradient(to bottom, rgb(13,194,181) 0%, rgb(13,186,237) 100%)',
    backgroundSize: 'cover'
};

class DatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: ActivitiesList
        }
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({activityId: id})
        let activity = this.state.activities.find(function(activity) {
            return activity.id === parseInt(id)
        })
        if (activity) {
            this.setState({activity: activity})
        }
    }

    render() {
        return (<div style={bgImage}>
            <div className='datePageTest'>
                <NavbarBootstrap/>

                <div className="date-page">

                    <div className='activityPicDiv'>
                        <img className="activityPic" src={`${this.state.activity.image}`} alt="date"/>
                    </div>

                    <h3>{this.state.activity.title}</h3>

                    <div className="date-information">
                        <h4>
                            <strong>Date Information</strong>
                        </h4>
                        <p>{this.state.activity.description}</p>
                    <p>Location: {this.state.activity.location}</p>
                <p>Cost: {this.state.activity.cost}</p>
                    </div>

                    <Link to='/all-dates-page' id='all-dates-back' className='back-button'>
                        <Button className='back-button' bsStyle='primary' bsSize='large'>Back</Button>
                    </Link>
                </div>

            </div>



        </div>);
    }
}

export default DatePage;
