import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../App.scss';

const Title = props => {
	return (
		<div>
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
				<Link to='/date-generator'>
				<button className="success-btn">
					<span>
					Let's Date
					</span>
				</button>
				</Link>
			</div>
		</div>
	);
}

export default Title;
