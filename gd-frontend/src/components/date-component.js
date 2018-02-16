import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class DateComponent extends Component {
    render() {
        return (
            <div className="date-page">

                <div className='activityPicDiv'>
                    <img className="activityPic" src={`${this.props.image}`} alt="date"/>
                </div>

                <h3>{this.props.title}</h3>

                <div className="date-information">
                    <h4>
                        <strong>Date Information</strong>
                    </h4>
                    <p>{this.props.description}</p>
                    <p>Location: {this.props.location}</p>
                    <p>Cost: {this.props.cost}</p>
                </div>

                <Link to='/all-dates-page' id='all-dates-back' className='back-button'>
                    <Button className='back-button' bsStyle='primary' bsSize='large'>Back</Button>
                </Link>
            </div>
        );
    }
};

export default DateComponent;
