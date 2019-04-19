import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Controller from '../../../../tools/Controller';

import {
	FormControl,
	FormControlLabel,
	InputLabel,
	OutlinedInput,
	Select,
	MenuItem,
	Checkbox,
	TextField
} from '@material-ui/core';

import RadioGroupModule from '../../../../modules/radio-group/radio-group';

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
				image_name: '',
				image_data: '',
				image_extension: '',
			},
			// below: refer to lists pulled from database, as opposed to the above tags and location which are specific to the newly created date
			locationsList: [],
			tagsList: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	//Gets our tag and location database
	componentDidMount() {
		Controller.fetchTags()
			.then(({tags}) => {
				this.setState({tagsList: tags})
			})

		Controller.fetchLocations()
			.then(({locations}) => {
				this.setState({locationsList: locations})
			})
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
		const {onSubmit} = this.props;
		const {data} = this.state;

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

	// maps through the tags in database and returns the createTagCheckbox fxn
	createTagCheckboxes = () => {
		return this.state.tagsList.map(({id, title}) => {
			return (
				 <FormControlLabel
				 	key={id}
					control={
						<Checkbox
							checked={this.state.data.tags[id]}
							onChange={this.toggleCheckbox.bind(this, id)}
							value={id}
							color="primary"
						/>
					}
					label={title}
				/>
			)
		})
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

	// Image Handling - ask JD w/ questions

	// onDrop fxn takes img files from dropzone and then processes them to base64 to be sent to the backend
	onDrop = (acceptedFiles, rejectedFiles) => {
		const { data } = this.state;

		acceptedFiles.forEach(file => {
			let { name, type } = file;

			// uses split to set type variable (img extension)
			let image_extension = type.split('/')[1];

			// creates new fileReader for base64 encoding
			const reader = new FileReader();

			reader.onload = () => {
				let image_data = reader.result;

				this.setState({data: Object.assign({}, data, {
					image_name: name,
					image_data: image_data,
					image_extension: image_extension
				})});
			}

			reader.onabort = () => console.log('image reading was aborted');
			reader.onerror = () => console.log('image reading has failed');

			reader.readAsDataURL(file);
		})
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
						{/* Title */}
						<div>
							<TextField
								id="title"
								label="Date Title"
								margin="normal"
								variant="outlined"
								value={data.title}
								onChange={this.handleChange}
							/>
						</div>

						{/* Description */}
						<div>
							<TextField
								id="description"
								label="Description"
								margin="normal"
								variant="outlined"
								value={data.description}
								onChange={this.handleChange}
							/>
						</div>

						{/* Location */}
						<div>
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
									onChange={this.handleChange}
									input={
										<OutlinedInput
											labelWidth={this.state.labelWidth}
											name="age"
											id="location"
										/>
									}
								>
									{/* <MenuItem value="">
									<em>None</em>
									</MenuItem> */}
									{this.createLocations()}
								</Select>
							</FormControl>
						</div>

						{/* Cost */}
						<div>
							<label id="cost">Average Cost</label>
							<RadioGroupModule
								name="cost"
								className="cost-radio-group"
								onChange={this.handleChange}
								options={[
									['0', 'Free'],
									['0.33', '$'],
									['0.66', '$$'],
									['1', '$$$'],
								]}
								value={data.cost}
							/>
						</div>

						{/* Tags */}
						<div>
							<label id="tag">Tags</label>
							<div className='checkbox-container'>
								{this.createTagCheckboxes()}
							</div>
						</div>

						{/* Image */}
						<div>
							<label id="image">Image</label>
							<div className="image-upload-div">
								<Dropzone
									className='dropzone'
									accept='image/*'
									onDrop={files => {
										this.onDrop(files)
									}}
								>
									<div className='dropzone-text'>
										<p>Try dropping some image files here, or click me to select files to upload.</p>

										<p>By uploading you are agreeing that you either own the image yourself, or are using an image with written permissions to share it.</p>
									</div>
								</Dropzone>
							</div>

						</div>

						<div>
							File Preview:
							{/* hmmm this check vs empty string seems fishy. look into the whole image preview section/process a bit heavier */}
							{data.image_name !== '' &&
								<div>
									<img src={data.image_data} className="image-preview" alt="preview"/>
									<p>{data.image_name}.{data.image_extension}</p>
								</div>
							}
						</div>

						<button id="submit" onClick={this.handleSubmit}>
							<span>Submit</span>
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default NewDateForm;
