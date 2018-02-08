import React, { Component } from 'react';
import '../App.css';

class SeeMoreBtn extends Component {
    render() {
        return (
            <div>
                <div className="see-more-contain">
                    <button className="see-more-btn" id="pg2">
                        See More
                    </button>
                </div>
            </div>
        );
    }
}

export default SeeMoreBtn;