import React, { Component } from 'react';
import '../App.css';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Row,
    Alert,
    Checkbox,
    HelpBlock
} from 'react-bootstrap';
import RadioGroup from './radio-group.js';
import Dropzone from 'react-dropzone';


const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'


class NewActivityForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                title: '',
                description: '',
                locations: {},
                cost: '',
                tags: {},
                image: {
                  name: '',
                  data: '',
                  extension: '',
                },
            },
            // QUESTION: why are these separated from state? I'm sure they could be combined -JD
            locations: [],
            tags: []
        }
    }

    //Gets our tag and location database
    componentDidMount() {
        fetch(`${API}/api/tags`).then(resp => {
            return resp.json()
        }).then(resp => {
            this.setState({tags: resp.tags})
        })

        fetch(`${API}/api/locations`).then(resp => {
            return resp.json()
        }).then(resp => {
            this.setState({locations: resp.locations})
        })
    }

    handleChange(event) {
        const { formState } = Object.assign({}, this.state.form)
        formState[event.target.name] = event.target.value
        this.setState({
            form: formState
        })
    }


    handleSubmit(e) {
      e.preventDefault()
      const { onSubmit } = this.props
      const { form } = this.state
      console.log("form",form);
      if(onSubmit) {
        onSubmit(form)
      }
    }

    // check for errors passed in on props, if yes, then return errors as errorString
    errorsFor(attribute) {
        var errorString = "";
        if(this.props.errors) {
          console.log("errors", this.props.errors); // errors for tags and image are NOT showing up here, therefore they are not being passed in on props
            const errors = this.props.errors.filter(error => error.param === attribute)
            if(errors) {
                errorString = errors.map(error => error.msg ).join(", ")
            }
        }
        return errorString === "" ? null : errorString
    }

    // creates a dropdown option for each location passed in
    createLocation = (location, i) => {
        return(
            <option key={i}>
            {location.name}
            </option>
        )
    }

    // maps through the locations in database and returns the createLocation fxn, which creates a unique dropdown for each location w/ the relevant key
    createLocations = () => {
        return this.state.locations.map((location, i) => {
            return this.createLocation(location, i)
        })
    }

    // creates tag checkbox for each tag passed in
    createTagCheckbox = (tag) => {
        return (
            <Checkbox
                inline
                type="checkbox"
                key={tag.id}
                name={tag.title}
                value={tag.id}
                onChange={this.toggleCheckbox.bind(this, tag.id)}>
                    <span className="generatorTags">
                      <i className="fas fa-tag"></i>
                    {tag.title}</span>
            </Checkbox>
        )
    }

    // maps through the tags in database and returns the createTagCheckbox fxn
    createTagCheckboxes = () => {
        return this.state.tags.map((tag) => {
            return this.createTagCheckbox(tag)
        })
    }


    toggleCheckbox = (tagID, e) => {
        const { form } = this.state
        const { tags } = form

        tags[tagID] = e.target.checked

        form.tags = tags

        this.setState({
            form: form
        })
    }

    // image handling

    // handleClear splices and clears the filesToBeSent and imageFile in state on
    handleClear(event,index){
        var filesToBeSent = this.state.filesToBeSent;
        filesToBeSent.splice(index,1);

        var imageFile = this.state.form.imageFile;
        imageFile.splice(index,1)

        this.setState({filesToBeSent,imageFile});
    }

    // onDrop fxn takes img files from dropzone and then processes them to be sent to the backend
    onDrop = (acceptedFiles, rejectedFiles) => {
        const { form } = this.state

        acceptedFiles.forEach(file => {
          console.log(file);

          let { name, type } = file

          // uses split to set type variable (img extension)
          type = type.split('/')[1]

          // console.log("name:", name, " type:", type)

          let image = {
            extension: type,
            name: name,
          }
          // creates new fileReader for base64 encoding
          const reader = new FileReader()

          reader.onload = () => {
            image.data = reader.result

            this.setState({
              form: Object.assign({}, form, {
                image: image,
              })
            })
          }

          reader.onabort = () => console.log('image reading was aborted')
          reader.onerror = () => console.log('image reading has failed')

          reader.readAsDataURL(file)
        })
    }


    render() {
        return (
            <div className="createDateDiv">
              <form className="createDateForm" onSubmit={this.handleSubmit.bind(this)}>

                <Row>
                  <Col xs={10} >
                    {this.props.errors &&
                      <Alert bsStyle="danger">
                        Please check the form and try again.
                      </Alert>
                    }
                  </Col>
                </Row>

                <div className='forms'>

                  {/*Title*/}
                  <Row>
                    <Col xs={10} >
                      <FormGroup
                        id = "title-form-group"
                        validationState = {this.errorsFor('title') && 'error'}>
                        <ControlLabel id="title">Title</ControlLabel>
                        <FormControl
                          placeholder="Date Title"
                          type="text"
                          name="title"
                          value={this.state.form.title}
                          onChange={this.handleChange.bind(this)}
                        />

                          {this.errorsFor('title') &&
                          <HelpBlock
                          id="title-help-block">{this.errorsFor('title')}</HelpBlock>
                          }


                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Description*/}
                  <Row>
                    <Col xs={10} >
                      <FormGroup
                        id = "description-form-group"
                        validationState = {this.errorsFor('description') && 'error'}>
                        <ControlLabel id="description">Description</ControlLabel>
                        <FormControl
                          componentClass="textarea"
                          placeholder="Description"
                          type="text"
                          name="description"
                          value={this.state.form.description}
                          onChange={this.handleChange.bind(this)}
                        />


                          {this.errorsFor('description') &&
                          <HelpBlock id="description-help-block">{this.errorsFor('description')}</HelpBlock>
                          }


                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                    <Col xs={10} >
                      <FormGroup
                        id = "location-form-group"
                        validationState = {this.errorsFor('location') && 'error'}>
                        <ControlLabel id="location">Location</ControlLabel>
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          type="select"
                          name="location"
                          onChange={this.handleChange.bind(this)}
                        >

                           <option value="location">Location</option>
                          {this.createLocations()}
                        </FormControl>


                          {this.errorsFor('location') &&
                          <HelpBlock id="location-help-block">{this.errorsFor('location')}</HelpBlock>
                          }

                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Cost*/}
                  <Row>
                    <Col xs={10} >
                      <FormGroup
                        id = "cost-form-group"
                        validationState = {this.errorsFor('cost') && 'error'}>
                        <ControlLabel id="cost">Average Cost</ControlLabel>

                        <br/>

                        <RadioGroup
                          name="cost"
                          onChange={this.handleChange.bind(this)}
                          options={[
                            ['0', 'Free'],
                            ['0.33', '$'],
                            ['0.66', '$$'],
                            ['1', '$$$']
                          ]}

                          value={this.state.form.cost}
                        />



                          {this.errorsFor('cost') &&
                          <HelpBlock id="cost-help-block">{this.errorsFor('cost')}</HelpBlock>
                          }


                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Tags*/}
                  <Row>
                    <Col xs={8}>

                      <FormGroup
                        id = "tags-form-group"
                        validationState = {this.errorsFor('tags') && 'error'}>
                        <ControlLabel id="tag">Tags</ControlLabel>

                        <br/>
                        <div className='checkbox-container'>
                            {this.createTagCheckboxes()}
                        </div>


                          {this.errorsFor('tags') &&
                          <HelpBlock id="tags-help-block">{this.errorsFor('tags')}</HelpBlock>
                          }


                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Image*/}
                  <Row>
                    <Col xs={10} >
                      <FormGroup
                        id = "image-form-group"
                        validationState = {this.errorsFor('image') && 'error'}>
                        <ControlLabel id="image">Image</ControlLabel>

                        <div className="image-upload-div">
                          <Dropzone
                              className='dropzone'
                            accept='image/*'
                            onDrop={(files) => {
                              this.onDrop(files)
                            }}
                          >
                            <div className='dropzone-text'>
                              <p>Try dropping some image files here, or click me to select files to upload.</p>
                          <br/>
                      <p>By uploading you are agreeing that you either own the image yourself, or are using an image with written permissions to share it.</p>
                            </div>
                          </Dropzone>
                        </div>
                        <br/>
                        <div>
                          File Preview:
                          {this.state.form.image.name !== '' &&
                            <div>
                              <pre>{JSON.stringify(this.state.form.image)}</pre>
                              <img src={this.state.form.image.data} className="image-preview" alt="preview" />
                              <p>{this.state.form.image.name}.{this.state.form.image.extension}</p>
                              <br/>
                            </div>
                          }
                        </div>



                          {this.errorsFor('image') &&
                          <HelpBlock id="image-help-block">{this.errorsFor('images')}</HelpBlock>
                          }


                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                    <Col xs={10} >
                      <br/>

                  <button
                        id="submit"
                        onClick={this.handleSubmit.bind(this)}
                      >
                        <span>Submit</span>
                      </button>
                    </Col>
                  </Row>


                        </div>

                </form>
            </div>
        );
    }
}

export default NewActivityForm;
