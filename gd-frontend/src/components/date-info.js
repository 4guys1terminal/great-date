import React, { Component } from 'react';

class DateInfo extends Component {
    render() {
        return (
            <div className="date-information">
                <h4><strong>Date Information</strong></h4>
                <p>{this.props.description}</p>
                <p>Location: {this.props.location}</p>
                <p>Cost: {this.props.cost}</p>
            </div>
        );
    }
}

export default DateInfo;
