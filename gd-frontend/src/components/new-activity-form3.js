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
// import 'bootstrap/dist/css/bootstrap.css'



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
                imageFile: []
            },
            filesToBeSent:[],
            filesPreview:[],
            printcount: 1,
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

        console.log(form);

        this.setState({
            form: form
        })
    }


    handleSubmit() {
        console.log(this.state.form);
        console.log(this.state.filesToBeSent);
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


    handleClear(event,index){
        var filesToBeSent=this.state.filesToBeSent;
        filesToBeSent.splice(index,1);
        var filesPreview=[];
        for(var i in filesToBeSent){
            filesPreview.push(<div>
            {filesToBeSent[i][0].name}
              <Button onClick={(event) => this.handleClear(event,i)}>
              >Clear</Button>
              </div>
            )
          }
          this.setState({filesToBeSent,filesPreview});
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log('Accepted files: ', acceptedFiles[0].name);
        var filesToBeSent = this.state.filesToBeSent;
        if(filesToBeSent.length < this.state.printcount) {
            filesToBeSent.push(acceptedFiles);
            var filesPreview = [];

            for (var i in filesToBeSent){
                console.log(filesToBeSent[i][0]);
                filesPreview.push(
                    <div>
                        <img src={filesToBeSent[i][0].preview} />
                        <br/>
                        <Button onClick={(event) => this.handleClear(event,i)}>
                            Clear
                        </Button>
                    </div>
                )
            }
            this.setState({filesToBeSent, filesPreview});
        } else {
            alert("Please, only one image per date.")
        }
    }


// TODO: take image file and convert to BASE64
// TODO: put that BASE64 image info into the form to send to the backend




// function encodeImageFileAsURL() {
//
//    var filesSelected = document.getElementById("inputFileToLoad").files;
//    if (filesSelected.length > 0) {
//      var fileToLoad = filesSelected[0];
//
//      var fileReader = new FileReader();
//
//      fileReader.onload = function(fileLoadedEvent) {
//        var srcData = fileLoadedEvent.target.result; // <--- data: base64
//
//        var newImage = document.createElement('img');
//        newImage.src = srcData;
//
//        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
//        alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
//        console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
//      }
//      fileReader.readAsDataURL(fileToLoad);
//    }
// }

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


                            <Row>
                                <Col xs={10} xsOffset={1}>
                                <FormGroup
                                    id = "image-form-group"
                                    validationState = {this.errorsFor('cost') && 'error'}>
                                    <ControlLabel id="image">Image</ControlLabel>

                                    <div className="image-upload-div">
                                        <Dropzone
                                            accept='image/*'
                                            onDrop={(files) => {
                                                console.log(files);

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
                                    {this.state.filesPreview}
                                    </div>

                                    <div>
                                    {this.state.uploadingMessage}
                                    </div>



                                    {/*
                                        <Button
                                            label="upload-button"
                                            onClick={(event) => this.handleImageUpload(event)}> Upload Image </Button>


                                    {this.errorsFor('image') &&
                                    <HelpBlock id="image-help-block">{this.errorFor('images')}</HelpBlock>
                                    }
                                    */}

                                </FormGroup>
                                </Col>
                            </Row>


                            <Row>
                                <Col xs={10} xsOffset={1}>
                                    <Button
                                        id="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                        >Submit</Button>
                                </Col>
                            </Row>

                            {this.state.images.map((image) => {
                                return (

                                )


                            })}
                        </div>

                </form>
            </div>
        );
    }
}

export default NewActivityForm;
