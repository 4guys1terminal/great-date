import React, {Component} from 'react';
import fetches from '../../tools/fetch';

const { fetchActivity } = fetches;

class DateComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentWillMount() {
		const { id } = this.props

		fetchActivity(id)
		.then((res) => {
			const { activity } = res

			if(!activity) {
			return
			}

			this.setState({activity: activity})
		}).catch(e => console.log('mount catch:', e))
	}


	// Function to turn our Cost from database into a dollar sign. Adjust cost converter to scale the ratings
	createCostIcon = (cost) => {
		if(!cost) {
			return
		}

		const costConverter = Math.round(cost * 3);
		switch (costConverter) {
			case 0:
				return "Free";
				break;
			case 1:
				return "$";
				break;
			case 2:
				return "$$";
				break;
			case 3:
				return "$$$";
				break;
			default:
				break;
		}
	}

	render() {
		const { activity } = this.state;
		const {imageName, title, description, location, cost} = activity;

		if (!activity) {
			return (
				<div className="container">
					<div className="grid">
						<h1>Loading...</h1>
					</div>
				</div>
			)
		}

		return (
			<div>
				<div className="date-page">
					<div className='activity-pic-div'>
						<img className="activity-pic" src={`${imageName}`} alt="date"/>
					</div>

					<h3>{title}</h3>

					<div className="date-information">
						<h4>
							<strong>Date Information</strong>
						</h4>

						<p>{description}</p>
						<p>Location: {location}</p>
						<p>Cost: {this.createCostIcon(cost)}</p>
					</div>
				</div>
			</div>
		);
	}
};

export default DateComponent;
