import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class BrowseDate extends Component {

    render() {
        return (
            <div>
              <div className="line-contain">
                <div className="line"></div>
              </div>

              <div className="browse-title">
                <Link
                  to='/all-dates-page'
                  id='all-dates-link'
                  className='browse-title'
                >Browse Dates</Link>
                
                </div>
            </div>
        );
    }
}

export default BrowseDate;
