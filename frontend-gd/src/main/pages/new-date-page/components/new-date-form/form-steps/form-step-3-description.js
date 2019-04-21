import React, { Component } from 'react';

import TextField from "@material-ui/core/TextField";

class FormStep3 extends Component {
	constructor(props) {
		super(props);
		this.stepNumber = 3;
	}

	render() {
		const { currentStep, data } = this.props;

		if (currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h3>
					Write out a detailed description of your date activities
				</h3>
				<h4>
					Here are some instructions on how to write a good description.
				</h4>
				
				<TextField
					label="Description"
					value={data.description}
					name="description"
					multiline
					rowsMax="8"
					onChange={this.props.handleChange}
					margin="normal"
					variant="outlined"
				/>
			</div>
		)
	}
}

export default FormStep3
