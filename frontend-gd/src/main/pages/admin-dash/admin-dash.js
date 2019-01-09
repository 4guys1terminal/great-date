// React Imports
import React, { Component } from 'react';

// Globals
import variables from '../../tools/variables';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Modules && General Components
import TableModule from '../../modules/table-module/table-module';

// Component Specfic Imports
import Controller from '../../tools/Controller';

// Styles
import './admin-dash.scss';

// Documentation/Notes


export default class AdminDash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: []
		};
	}

	componentDidMount() {
		Controller.fetchAllActivities()
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
				<h2 className="admin-dash-header">Great Date Submissions</h2>
				<TableModule activities={activities}/>
			</div>
		);
	}
}
