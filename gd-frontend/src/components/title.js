import React, {Component} from 'react';
import '../App.css';

class Title extends Component {
    render() {
        return (<div>
            <div>
                <h1 className="title">
                    Date Night Made Easy
                </h1>
            </div>

            <div className='icons-front'>
                <i className="fa-5x front-icons fas fa-utensils"></i>
                <i className="fa-5x front-icons fas fa-coffee"></i>
                <i className="fa-5x front-icons fas fa-glass-martini"></i>
            </div>

            <div>
                <button className="success-btns" onClick={this.props.onClick}>
                    <span>
                    Let's Date
                    </span>
                </button>
            </div>

        </div>);
    }
}

export default Title;
