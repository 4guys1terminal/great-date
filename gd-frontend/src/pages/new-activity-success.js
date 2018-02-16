import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom'

import bgImage from '../functions/bgImage'

class NewActivitySuccess extends Component {
    render() {
        return (<div className="success-page" style={bgImage}>
            <div className="success-stuff">
                <h1>
                    Success!
                </h1>
                <Link to='/all-dates-page'>
                    <button className="see-more-btn">To All Dates Page</button>
                </Link>
            </div>
        </div>);
    }
}

export default NewActivitySuccess;
