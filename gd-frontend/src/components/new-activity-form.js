import React, { Component } from 'react';
import '../App.css';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    ButtonGroup,
    Row,
    HelpBlock,
    Alert,
    Radio,
    Checkbox
} from 'react-bootstrap';
import RadioGroup from './radio-group.js';
import Dropzone from 'react-dropzone';
import MapContainer from '../components/google-map';


class NewActivityForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                title: '',
                description: '',
                location: '',
                cost: '',
                tags: {},
                imageFiles: [],
                imageNames: []
            },
            filesToBeSent:[],
            imagesAllowed: 1,
            locationExamples: [
                {id: 1, value: 'pacific_beach', title: 'Pacific Beach'},
                {id: 2, value: 'downtown', title: 'Downtown'},
                {id: 3, value: 'point_loma', title: 'Point Loma'},
                {id: 4, value: 'north_park', title: 'North Park'},
                {id: 5, value: 'la_jolla', title: 'La Jolla'}
            ],
            tagExamples: [
                {id: 1, title: 'Romantic'},
                {id: 2, title: 'Thrilling'},
                {id: 3, title: 'Morning'},
                {id: 4, title: 'Afternoon'},
                {id: 5, title: 'Evening'},
                {id: 6, title: 'Outdoors'},
            ]
        }
    }

    handleChange(e) {
        const { form } = this.state

        form[e.target.name] = e.target.value

        this.setState({
            form: form
        })
    }


    handleSubmit() {
        let { form } = this.state

        form.cost = parseFloat(form.cost)

        console.log(form)

        this.props.onSubmit(form)
    }


    errorsFor(attribute) {
        var errorString = "";
        if(this.props.errors) {
            const errors = this.props.errors.filter(error => error.param === attribute)
            if(errors) {
                errorString = errors.map(error => error.msg ).join(", ")
            }
        }
        return errorString === "" ? null : errorString
    }


    createLocation = (location) => {
        return(
            <option
                value={location.value}
                key={location.id}>
            {location.title}
            </option>
        )
    }


    createLocations = () => {
        return this.state.locationExamples.map((location) => {
            return this.createLocation(location)
        })
    }


    createTagCheckbox = (tag) => {
        return (
            <Checkbox
                inline
                type="checkbox"
                key={tag.id}
                name={tag.title}
                value={tag.id}
                onChange={this.toggleCheckbox.bind(this, tag.id)}>
                    {tag.title}
            </Checkbox>
        )
    }


    createTagCheckboxes = () => {
        return this.state.tagExamples.map((tag) => {
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

// Borderline positive that the function below and the onDrop() function below
// can be cut down a bit by merging this filesToBeSent step with the encoding
// step. will take a look at down the line (it works fine for now)
// - JD 2/14/2018


// Clearing state when the clear button is pressed. Will have to be adjusted if more than one image for dates is allowed.
    handleClear(event,index){
        var filesToBeSent=this.state.filesToBeSent;
        filesToBeSent.splice(index,1);

        var imageFiles=this.state.form.imageFiles;
        imageFiles.splice(index,1)

        var imageNames=this.state.form.imageNames;
        imageNames.splice(index,1)

        this.setState({filesToBeSent,imageFiles});
    }


    onDrop = (acceptedFiles,rejectedFiles) => {
        let { filesToBeSent, imagesAllowed, form } = this.state
        // console.log("acceptedFiles",acceptedFiles);

        // sending all accepted files to state as filesToBeSent
        if(filesToBeSent.length < imagesAllowed) {
            filesToBeSent.push(acceptedFiles);
            filesToBeSent.forEach(image => {
                const reader = new FileReader()
                // console.log(image[0].name);
                form.imageNames.push(image[0].name)
                // register the handlers
                reader.onload = () => {
                    form.imageFiles.push(reader.result)
                }
                reader.onabort = () => console.log('image reading was aborted')
                reader.onerror = () => console.log('image reading has failed')
                // end register

                reader.readAsDataURL(image[0])
            })
        } else {
            alert("Please, only one image per date.")
        }


        // console.log(form);
        this.setState({
            form: form,
            filesToBeSent: filesToBeSent
        })
    }


    render() {
        return (
            <div className="createDateDiv">
              <form className="createDateForm">

                <Row>
                  <Col xs={10} xsOffset={1}>
                    {this.props.errors &&
                      <Alert bsStyle="danger">
                        Please check the form and try again.
                      </Alert>
                    }
                  </Col>
                </Row>

                <div className='forms'>

                  {/*
                    Highly consider componentizing each of these form inputs out in the future.
                    - JD 2/12/2018
                  */}

                  {/*Title*/}
                  <Row>
                    <Col xs={10} xsOffset={1}>
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
                        {/*
                          {this.errorsFor('title') &&
                          <HelpBlock
                          id="title-help-block">{this.errorFor('title')}</HelpBlock>
                          }
                        */}

                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Description*/}
                  <Row>
                    <Col xs={10} xsOffset={1}>
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

                        {/*
                          {this.errorsFor('description') &&
                          <HelpBlock id="description-help-block">{this.errorFor('description')}</HelpBlock>
                          }
                        */}

                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Location*/}
                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <FormGroup
                        id = "location-form-group"
                        validationState = {this.errorsFor('location') && 'error'}>
                        <ControlLabel id="location">Location</ControlLabel>
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          type="select"
                          name="location"
                          value={this.state.form.location}
                          onChange={this.handleChange.bind(this)}
                        >

                          <option value="location">Location</option>

                          {this.createLocations()}

                        </FormControl>

                        {/*}
                          {this.errorsFor('location') &&
                          <HelpBlock id="location-help-block">{this.errorFor('location')}</HelpBlock>
                          }
                        */}

                      </FormGroup>
                    </Col>
                  </Row>



                  {/*Cost*/}
                  <Row>
                    <Col xs={10} xsOffset={1}>
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


                        {/*

                          {this.errorsFor('cost') &&
                          <HelpBlock id="cost-help-block">{this.errorFor('cost')}</HelpBlock>
                          }
                        */}

                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Tags*/}
                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <FormGroup
                        id = "tags-form-group"
                        validationState = {this.errorsFor('tags') && 'error'}>
                        <ControlLabel id="tag">Tags</ControlLabel>
                        <br/>

                        {this.createTagCheckboxes()}

                        {/*}
                          {this.errorsFor('tags') &&
                          <HelpBlock id="tags-help-block">{this.errorFor('tags')}</HelpBlock>
                          }
                        */}

                      </FormGroup>
                    </Col>
                  </Row>

                  {/*Image*/}
                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <FormGroup
                        id = "image-form-group"
                        validationState = {this.errorsFor('image') && 'error'}>
                        <ControlLabel id="image">Image</ControlLabel>

                        <div className="image-upload-div">
                          <Dropzone
                            accept='image/*'
                            onDrop={(files) => {
                              this.onDrop(files)
                            }}
                          >
                            <div>
                              <p>Try dropping some files here, or click me to select files to upload.</p>
                            </div>
                          </Dropzone>
                        </div>

                        <div>
                          File Preview:

                          {this.state.filesToBeSent.map((image, index) => {
                            return (
                              <div
                                key={index}
                              >
                                <img src={image[0].preview} className="image-preview"/>
                                <p> {image[0].name} </p>
                                <br/>
                                <Button onClick={(event) =>
                                  this.handleClear(event)}>
                                  Clear
                                </Button>
                              </div>
                            )
                                        })}

                                    </div>



                                    {this.errorsFor('image') &&
                                    <HelpBlock id="image-help-block">{this.errorFor('images')}</HelpBlock>
                                    }


                                </FormGroup>
                                </Col>
                            </Row>


                            <Row>
                                <Col xs={10} xsOffset={1}>
                                    <br/>
                                    <Button
                                        bsSize='large'
                                        bsStyle='primary'
                                        id="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                        >Submit</Button>
                                </Col>
                            </Row>



                        </div>


                        {/*
                          {this.errorsFor('image') &&
                          <HelpBlock id="image-help-block">{this.errorFor('images')}</HelpBlock>
                          }
                        */}

                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <br/>
                      <Button
                        id="submit"
                        onClick={this.handleSubmit.bind(this)}
                      >Submit</Button>
                    </Col>
                  </Row>

                </div>

              </form>
              <MapContainer />
            </div>
        );
    }
}

export default NewActivityForm;
