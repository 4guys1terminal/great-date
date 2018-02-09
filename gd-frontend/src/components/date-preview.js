import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ActivitiesList from '../store/ActivitiesList.js';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class DatePreview extends Component {
    render() {
        return (
            <div className="date-preview hvr-grow-shadow">

                <li className="datePreview cell" key={this.props.id}>
                    <Link to={`/activities/${this.props.id}`}>
                        <img className="thumbnails responsive-image" src={this.props.image} />
                        <p>{this.props.title}</p>
                    </Link>
                </li>

            </div>
        );
    }
}

export default DatePreview;
