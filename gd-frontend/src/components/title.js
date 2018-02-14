import React, {Component} from 'react';
import '../App.css';
import TitleButton from './title-button.js';

class Title extends Component {
    render() {
        return (<div>
            <h1 className="title">
                Date Night Made Easy
            </h1>

            <div className="date-btn-contain">
                <button className="date-btn" onClick={this.props.onClick}>
                    Let's Date
                </button>
            </div>

        </div>);
    }
}

export default Title;
