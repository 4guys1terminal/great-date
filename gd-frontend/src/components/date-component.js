import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class DateComponent extends Component {
    createCostIcon = () => {
        const costConverter = Math.round(this.props.cost * 3)
        switch (costConverter) {
            case 0:
                return "Free"
                break;
            case 1:
                return "$"
                break;
            case 2:
                return "$$"
                break;
            case 3:
                return "$$$"
                break;
            default:
                break;
        }
    }

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
                    <p>Cost: {this.createCostIcon()}</p>
                </div>

                <Link to='/all-dates-page' id='all-dates-back' className='back-button'>
                    <Button className='back-button' bsStyle='primary' bsSize='large'>Back</Button>
                </Link>
            </div>
        );
    }
};

export default DateComponent;
