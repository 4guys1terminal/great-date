import React, { Component } from 'react';

import TextField from "@material-ui/core/TextField";

class FormStep2 extends Component {
	constructor(props) {
		super(props);
		this.stepNumber = 2;
	}

	render() {
		const { currentStep, data } = this.props;

		if (currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h3>
					Choose a descriptive title for your date
				</h3>
				<h4>
					Here are some instructions on how to write a good title.
				</h4>
				
				<TextField
					label="Title"
					value={data.title}
					name="title"
					onChange={this.props.handleChange}
					margin="normal"
					variant="outlined"
				/>
			</div>
		)
	}
}

export default FormStep2
