import React, { Component } from 'react';

import RadioGroupModule from '../../../../../modules/radio-group/radio-group';


class FormStep5 extends Component {
	constructor(props) {
		super(props);
		this.stepNumber = 5;
	}

	render() {
		const { currentStep, data } = this.props;

		if (currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h3>
					How much is it going to cost?
				</h3>
				<h4>
					Give a general estimate of the date's cost.
				</h4>
				
				<RadioGroupModule
					name="cost"
					className="cost-radio-group"
					onChange={this.props.handleChange}
					options={[
						['0', 'Free'],
						['0.33', '$'],
						['0.66', '$$'],
						['1', '$$$'],
					]}
					value={data.cost}
				/>
			</div>
		)
	}
}

export default FormStep5
