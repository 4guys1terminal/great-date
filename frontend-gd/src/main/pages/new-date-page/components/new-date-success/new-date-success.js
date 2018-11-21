import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import variables from '../../tools/variables';

import '../../../App.scss';

// TODO: this will become either a rendered stateless component or a modal pop up after new date success
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
