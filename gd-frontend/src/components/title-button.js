import React, { Component } from 'react';
import '../App.css';

class TitleButton extends Component {
    render() {
        return (
            <div>
              <div className="date-btn-contain">
                <button className="date-btn">
                  Let's Date
                </button>
              </div>
            </div>
        );
    }
}

export default TitleButton;
