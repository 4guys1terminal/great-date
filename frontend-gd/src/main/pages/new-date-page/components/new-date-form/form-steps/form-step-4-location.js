import React, { Component } from 'react';
import Controller from '../../../../../tools/Controller';

import {
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	MenuItem
} from "@material-ui/core";

class FormStep4 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationsList: []
		};

		this.stepNumber = 4;
	}

	componentDidMount() {
	  Controller.fetchLocations()
			.then(({ locations }) => {
				this.setState({ locationsList: locations })
			})
	}


	// maps through the locations in database and returns the createLocation fxn, which creates a unique dropdown for each location w/ the relevant key
	createLocations = () => {
		return this.state.locationsList.map(({name}, i) => {
			return (
				<MenuItem value={name} key={i}>
					{name}
				</MenuItem>
			)
		})
	}

	render() {
		const { currentStep, data } = this.props;

		if (currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h3>
					Choose the most relevant location for the date
				</h3>
				<h4>
					Pick the most relevant location where the date occurs. If the location isn't listed, choose "Other". If the date spans multiple locations, pick the one where the majority of the activities occur in, or the first. Whatever makes the most sense to you!
				</h4>

				<FormControl className="location-dropdown" variant="outlined">
					<InputLabel
						ref={ref => {
						this.InputLabelRef = ref;
						}}
						htmlFor="location"
					>
						Location
					</InputLabel>
					<Select
						value={data.location}
						onChange={this.props.handleChange}
						input={
							<OutlinedInput
								labelWidth={1}
								name="location"
								id="location"
								className="location-input"
							/>
						}
					>
						{this.createLocations()}
					</Select>
				</FormControl>
			</div>
		)
	}
}

export default FormStep4
