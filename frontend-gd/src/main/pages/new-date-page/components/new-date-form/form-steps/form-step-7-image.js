import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


class FormStep7 extends Component {
	constructor(props) {
		super(props);
		this.stepNumber = 7;
	}

	// Image Handling
	// onDrop fxn takes img files from dropzone and then processes them to base64 to be sent to the backend
	onDrop = (acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach(file => {
			let { name, type } = file;

			// uses split to set type variable (img extension)
			let imageExtension = type.split('/')[1];

			// creates new fileReader for base64 encoding
			const reader = new FileReader();

			reader.onload = () => {
				let imageData = reader.result;

				this.props.uploadImage(name, imageData, imageExtension);
			}

			reader.onabort = () => console.log('image reading was aborted');
			reader.onerror = () => console.log('image reading has failed');

			reader.readAsDataURL(file);
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
					Upload a high quality image for the date
				</h3>
				<h4>
					Here are some instructions on how to pick a good royalty free picture or take your own, as well as image qualifications.
				</h4>

				<div>
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
					{data.imageName !== '' &&
						<div>
							<img src={data.imageData} className="image-preview" alt="preview"/>
							<p>{data.imageName}.{data.imageExtension}</p>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default FormStep7
