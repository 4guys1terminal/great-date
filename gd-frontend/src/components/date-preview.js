import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ActivitiesList from '../store/ActivitiesList.js';


class DatePreview extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="date-preview">

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
