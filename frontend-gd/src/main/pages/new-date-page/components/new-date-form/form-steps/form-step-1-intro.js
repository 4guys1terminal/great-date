import React, { Component } from 'react'


class FormStep1 extends Component {
	constructor(props) {
		super(props);
		this.stepNumber = 1;
	}

	render() {
		if (this.props.currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h2>
					Welcome to the "Create a Date" builder
				</h2>
				<h4>
					Here are some instructions on how to best use this tool to make a fun/exciting activity for yourself and others to enjoy.
				</h4>
			</div>
		)
	}
}

export default FormStep1
