import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class SeeMoreBtn extends Component {
    render() {
        return (
            <div>
                <div className="see-more-contain">

                    <Link
                        to='/all-dates-page'
                        id='all-dates-nav'
                        className='nav-btn1'>
                        <button className="see-more-btn" id="pg2">See More</button>
                    </Link>

                </div>
            </div>
        );
    }
}

export default SeeMoreBtn;
