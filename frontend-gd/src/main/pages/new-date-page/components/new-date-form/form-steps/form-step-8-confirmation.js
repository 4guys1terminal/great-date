import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DateComponent from '../../../../../modules/date-component';

class FormStep8 extends Component {
	constructor(props) {
		super(props);
		this.stepNumber = 8;
	}

	render() {
		const submitDisabled = true;

		if (this.props.currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h3>
					Confirm date information
				</h3>
				<h4>
					Make sure your date looks how you want it to before you submit
				</h4>

				<DateComponent
					activity={this.props.data}
				/>

				<Button
					variant="contained"
					color="primary"
					onClick={this.props.handleSubmit}
					disabled={submitDisabled}
				>
					Submit
				</Button>
			</div>
		)
	}
}

export default FormStep8
