import React, { Component } from 'react';

class DateInfo extends Component {
    createCostIcons = () => {
        const costConverter = this.props.cost * 3
        if(costConverter === 0) {
            return "Free"
        } else if (costConverter === 1) {
            return "$"
        } else if (costConverter === 2) {
            return "$$"
        } else if (costConverter === 3) {
            return "$$$"
        }

    }

    render() {
        return (
            <div className="date-information">
                <h4><strong>Date Information</strong></h4>
                <p>{this.props.description}</p>
                <p>Location: {this.props.location}</p>
            <p>Cost: {this.createCostIcons()}</p>
            </div>
        );
    }
}

export default DateInfo;
