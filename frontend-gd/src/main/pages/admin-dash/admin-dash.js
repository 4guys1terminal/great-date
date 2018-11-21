// React Imports
import React, { Component } from 'react';

// Globals
import variables from '../../tools/variables';

// Modules && General Components
import { CardHeader } from 'reactstrap';
import TableModule from '../../modules/table-module/table-module';

// Component Specfic Imports
import DateController from '../../controllers/DateController';

// Styles
import './admin-dash.scss';

// Documentation/Notes


export default class AdminDash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: {}
		};
	}

	componentWillMount() {
		DateController.fetchAllActivities()
			.then((res) => {
				const { activities } = res;

				if (!activities) {
					return
				}

				this.setState({activities})
			})
			.catch(e => console.log(e))
	}


	render() {
		const { activities } = this.state;

		if(!activities) {
			return (
				<div className="container">
					<div className="grid">
						<h1 className="loading-text">Loading...</h1>
					</div>
				</div>
			)
		}

		return (
			<div className="admin-dash" style={variables.backgroundStyle}>
				<CardHeader>
					<h2 className="admin-dash-header">Great Date Submissions</h2>
				</CardHeader>

				<TableModule activities={this.state.activities}/>
			</div>
		);
	}
}
