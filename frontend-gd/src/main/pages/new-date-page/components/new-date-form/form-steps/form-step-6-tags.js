import React, { Component } from 'react';
import Controller from '../../../../../tools/Controller';
import { FormControlLabel, Checkbox } from '@material-ui/core';

class FormStep6 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tagsList: []
		};

		this.stepNumber = 6;
	}

	componentDidMount() {
	  	Controller.fetchTags()
			.then(({ tags }) => {
				this.setState({tagsList: tags})
			})
	}


	// maps through the tags in database and returns the createTagCheckbox fxn
	createTagCheckboxes = () => {
		return this.state.tagsList.map(({id, title}) => {
			return (
				 <FormControlLabel
				 	key={id}
					control={
						<Checkbox
							checked={this.props.data.tags[id]}
							onChange={this.props.toggleCheckbox.bind(this, id)}
							value={id}
							color="primary"
						/>
					}
					label={title}
				/>
			)
		})
	}

	render() {
		const { currentStep } = this.props;

		if (currentStep !== this.stepNumber) {
			return null;
		}

		return (
			<div >
				<h3>
					Pick all relevant tags for the date.
				</h3>
				<h4>
					Here are some instructions on how to best tag your date.
				</h4>

				<div className='checkbox-container'>
					{this.createTagCheckboxes()}
				</div>
			</div>
		)
	}
}

export default FormStep6
