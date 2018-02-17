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


const API = "http://localhost:3000"

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
                imageFile: [],
                imageType: []
            },
            filesToBeSent:[],
            imagesAllowed: 1,
            locations: [],
            tags: []
        }
    }
      //Gets our tag and location database
    componentWillMount() {
        fetch(`${API}/tags`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({tags: resp.tags})
        })

        fetch(`${API}/locations`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({locations: resp.locations})
        })
    }

    handleChange(e) {
        const { form } = this.state
        form[e.target.name] = e.target.value
        this.setState({
            form: form
        })
    }


    handleSubmit() {
        console.log(this.state.form);
        this.props.onSubmit(this.state.form);
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
            <option>
            {location.name}
            </option>
        )
    }


    createLocations = () => {
        return this.state.locations.map((location) => {
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

    //Image shit (Jordan Needs To Comment)
    handleClear(event,index){
        var filesToBeSent=this.state.filesToBeSent;
        filesToBeSent.splice(index,1);

        var imageFile=this.state.form.imageFile;
        imageFile.splice(index,1)

        this.setState({filesToBeSent,imageFile});
    }


    onDrop = (acceptedFiles,rejectedFiles) => {
        let filesToBeSent = this.state.filesToBeSent

        // sending all accepted files to state as filesToBeSent
        if(filesToBeSent.length < this.state.imagesAllowed) {
            filesToBeSent.push(acceptedFiles);
            this.setState({filesToBeSent});
        } else {
            alert("Please, only one image per date.")
        }


        //converting the filesToBeSent into base64
        const form = this.state.form
        let imageBase64 = form.imageFile
        let imageType = form.imageType

        filesToBeSent.forEach(image => {
            console.log(image[0]);
            console.log(image[0].type);
            imageType.push(image[0].type)
            const reader = new FileReader();
            reader.readAsDataURL(image[0])
            reader.onload = () => {
                imageBase64.push(reader.result)
            };
            reader.onabort = () => console.log('image reading was aborted');
            reader.onerror = () => console.log('image reading has failed');
        })
        this.setState({
            imageFile: imageBase64,
            imageType: imageType,
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

                  {/* All form inputs labeled and minimized because DAMN that's a lot of code. Highly consider componentizing each of these form inputs out in the future.*/}

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
                          onChange={this.handleChange.bind(this)}
                        >

                          // <option value="location">Location</option>
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
                            ['free', 'Free'],
                            ['$', '$'],
                            ['$$', '$$'],
                            ['$$$', '$$$']
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
                              <p>(Only image files will be accepted.)</p>
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


                  <Col xs={10} xsOffset={1}>
                    <div className='map'>

                                    </div>
                                </Col>

                        </div>

                </form>
            </div>
        );
    }
}

export default NewActivityForm;
