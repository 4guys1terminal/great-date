import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import {
	FormStep1,
	FormStep2,
	FormStep3,
	FormStep4,
	FormStep5,
	FormStep6,
	FormStep7,
	FormStep8

} from './form-steps';

import '../../../../../App.scss';
import './new-date-form.scss';

// TODO: add input validation and user feedback

class NewDateForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				title: '',
				description: '',
				location: '',
				cost: '',
				tags: {},
				tagQty: 0,
				imageName: '',
				imageData: '',
				imageExtension: '',
			},

			// Form Functionality
			currentStep: 1
		}

		this.totalSteps = 8;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.toggleCheckbox = this.toggleCheckbox.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.previousStep = this.previousStep.bind(this);
	}


	handleChange({target: {name, value}}) {
		this.setState({
			data: {
				...this.state.data,
				[name]: value
			}
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const { onSubmit } = this.props;
		const { data } = this.state;

		// extra processing to create tags quantity int for backend validations
		let trueTagsArray = Object.values(data.tags);
		let tagQty = 0;

		for (var i = 0; i < trueTagsArray.length; i++) {
			if(trueTagsArray[i] === true) {
				tagQty++;
			}
		}

		let updatedForm = Object.assign({}, data, {
			tagQty,
		})

		if (onSubmit) {
			onSubmit(updatedForm);
		}
	}

	nextStep() {
		const currentStep = this.state.currentStep;
		const nextStep = currentStep < this.totalSteps ? currentStep + 1 : currentStep;

		this.setState({
			currentStep: nextStep
		})
	}

	previousStep() {
		const currentStep = this.state.currentStep;
		const previousStep = currentStep > 2 ? currentStep - 1 : currentStep;

		this.setState({
			currentStep: previousStep
		})
	}

	get nextButton() {
		const { currentStep } = this.state;

		if(currentStep < this.totalSteps) {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={this.nextStep}
				>

					Next
				</Button>
			)
		}

		return null;
	}

	get previousButton() {
		const { currentStep } = this.state;

		if(currentStep > 2) {
			return (
				<Button
					variant="contained"
					color="primary"
					onClick={this.previousStep}
				>
					Back
				</Button>
			)
		}

		return null;
	}


	// check for errors passed in on props, if yes, then return errors as errorString
	errorsFor(attribute) {
		var errorString = "";

		if (this.props.errors) {
			const errors = this.props.errors.filter(error => error.param === attribute);

			if (errors) {
				errorString = errors.map(error => error.msg).join(", ");
			}
		}

		//REFACTOR:
		return errorString === ""
			? null
			: errorString
	}


	toggleCheckbox = (tagId, {target: {checked}}) => {
		this.setState({
			data: {
				...this.state.data,
				tags: {
					...this.state.data.tags,
					[tagId]: checked
				}
			}
		})
	}

	handleImageUpload(name, imageData, imageExtension) {
		this.setState({
			data: {
				...this.state.data,
				imageName: name,
				imageData: imageData,
				imageExtension: imageExtension
			}
		});
	}

	render() {
		const { data } = this.state;

		return (
			<div className="new-date-form">
				<form
					className="create-date-form"
					onSubmit={() => this.handleSubmit()}
				>
					<div className='forms'>
						<FormStep1
							currentStep={this.state.currentStep}

						/>

						<FormStep2
							currentStep={this.state.currentStep}
							handleChange={this.handleChange}
							data={data}
						/>

						<FormStep3
							currentStep={this.state.currentStep}
							handleChange={this.handleChange}
							data={data}
						/>

						<FormStep4
							currentStep={this.state.currentStep}
							handleChange={this.handleChange}
							data={data}
						/>

						<FormStep5
							currentStep={this.state.currentStep}
							handleChange={this.handleChange}
							data={data}
						/>

						<FormStep6
							currentStep={this.state.currentStep}
							toggleCheckbox={this.toggleCheckbox}
							data={data}
						/>

						<FormStep7
							currentStep={this.state.currentStep}
							uploadImage={this.handleImageUpload}
							data={data}
						/>


						<FormStep8
							currentStep={this.state.currentStep}
							handleSubmit={this.handleSubmit}
							data={data}
						/>


						{this.previousButton}
						{this.nextButton}

					</div>
				</form>
			</div>
		);
	}
}

export default NewDateForm;
