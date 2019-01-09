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


//TODO: btn that lets admin change date approval status
//TODO: fxn that processes status change btn click and changes the date in the database to reflect (needs to actively change the FE as well & log admin modified)
//NOTE: would be nice to log ALL date history until date is deleted from the system by an admin permanently.
//NOTE: Date statuses: "pendingApproval", "approved", "pendingReview" (for questionable ones), "rejected")


export default class AdminDash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
			filters: {},
		};
	}

	componentDidMount() {
		this.getAllActivities();
	}

	getAllActivities() {
		Controller.fetchAllActivities()
			.then((res) => {
				const { activities } = res;

				if (!activities) {
					return;
				}

				this.setState({activities})
			})
			.catch(e => console.log(e))
	}

	changeDateStatus(id, event) {
		const dateStatus = event.target.value;

		Controller.updateDateStatus(id, dateStatus)
			.then(() => this.getAllActivities())
	}

	getTableHeaders() {
		return [
			<thead key={"table-header"} className="headers admin-table-body">
				<tr>
					<th>Date Title</th>
					<th>Description</th>
					<th>Cost</th>
					<th>Image</th>
					<th>Created On</th>
					<th>Status</th>
					<th>Last Modified</th>
					<th>Admin Modified</th>
				</tr>
			</thead>
		]
	}


	// TODO: need to come back to this once i have the BE routes and DB fields figured out
	getTableRows(dateData) {
		return dateData.map((date) => {
			return (
				<tr key={date.id}>
					<td>{date.title}</td>
					<td>{date.description}</td>
					<td>{date.cost}</td>
					{/* <td>image goes here</td> */}
					<td><img src={date.imageName} alt={date.title} style={{width: "100px"}}/></td>
					<td>{date.createdAt}</td>
					<td>
						<FormControl>
							<Select
								value={date.status}
								onChange={(event) => this.changeDateStatus(date.id, event)}
								displayEmpty
								name="status"
							>
								<MenuItem value={variables.approvalStatus["pendingApproval"]}>
									Pending Approval
								</MenuItem>
								<MenuItem value={variables.approvalStatus["approved"]}>
									Approve
								</MenuItem>
								<MenuItem value={variables.approvalStatus["pendingReview"]}>
									Needs Review
								</MenuItem>
								<MenuItem value={variables.approvalStatus["rejected"]}>
									Reject
								</MenuItem>
							</Select>
						</FormControl>
					</td>
					<td>{date.updatedAt}</td>
					<td>Jordan</td>
				</tr>
			)
		})
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
