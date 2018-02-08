import React, { Component } from 'react';
import '../App.css';

class Grid extends Component {
    render() {
        return (
            <div class="grid">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>
        );
    }
}

export default Grid;