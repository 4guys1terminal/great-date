import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import variables from '../../tools/variables';

import '../../../App.scss';

class NewActivitySuccess extends Component {
	render() {
		return (
			<div className="success-page" style={variables.backgroundStyle}>
				<div className="success-stuff">
					<h1>
						Success!
					</h1>
					<Link to='/home'>
						<button className='success-btn'><span>To Home</span></button>
					</Link>
					<Link to='/browse-dates'>
						<button className='success-btn'><span>To All Dates Page</span></button>
					</Link>
				</div>
			</div>
		);
	}
}

export default NewActivitySuccess;
