import React from 'react';
import DateCard from '../date-card';
import '../../../App.scss';

const Grid = props => {
	const { activities } = props;

	if(!activities) {
		return (
			<div className="container">
				<div className="grid">
					<h1 style={style}>Loading...</h1>
				</div>
			</div>
		)
	}

	return (
		<div className="container">
			<div className="grid">
				{activities.map((activity) => {
					return (
						<DateCard
							key={activity.id}
							activity={activity}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Grid;


const style = {
    color: 'rgb(6, 144, 185)',
}
