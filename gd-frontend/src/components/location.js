import React, { Component } from 'react';
import '../App.css';

class Location extends Component {
    render() {
        return (
                <option value={this.props.value}>{this.props.title}</option>
        );
    }
}

export default Location;
