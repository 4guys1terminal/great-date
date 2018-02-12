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
                tags: {
                    // tagID: true|false
                },
                image: ''
            },
            test: '',
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

    handleChange(event) {
        const formState = Object.assign({}, this.state.form)
        formState[event.target.name] = event.target.value
        this.setState({form: formState})
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

        // if (this.selectedCheckboxes.has(tagId)) {
        //     this.selectedCheckboxes.delete(tagId);
        // } else {
        //     this.selectedCheckboxes.add(tagId);
        // }

        // const newTags = this.state.form.tags
        // newTags =
        // for(const checkbox of this.selectedCheckboxes) {
        //         newTags.push(checkbox);
        //     }
        // this.setState({
        //     tags: newTags
        // })

    }

    // handleChange(event) {
    //     const formState = Object.assign({}, this.state.form)
    //     formState[event.target.name] = event.target.value
    //     this.setState({form: formState})
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
                                      value={this.state.test}
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

                            {/*
                            <Row>
                                <Col xs={10} xsOffset={1}>
                                <FormGroup
                                    id = "tags-form-group"
                                    validationState = {this.errorsFor('tags') && 'error'}>
                                    <ControlLabel id="tag">Tags</ControlLabel>
                                    <br/>
                                    <Checkbox

                                        inline
                                        type="checkbox"
                                        name="1"
                                        value={this.state.form.tags}
                                        onChange={this.handleChange.bind(this)}
                                    > Romantic
                                    </Checkbox>

                                    <Checkbox
                                        inline
                                        type="checkbox"
                                        name="2"
                                        value={this.state.form.tags}
                                        onChange={this.handleChange.bind(this)}
                                    > Outdoors
                                    </Checkbox>

                                    <Checkbox
                                        inline
                                        type="checkbox"
                                        name="3"
                                        value={this.state.form.tags}
                                        onChange={this.handleChange.bind(this)}
                                    > Thrilling
                                    </Checkbox>

                                    <Checkbox
                                        inline
                                        type="checkbox"
                                        name="4"
                                        value={this.state.form.tags}
                                        onChange={this.handleChange.bind(this)}
                                    > Morning
                                    </Checkbox>

                                    <Checkbox
                                        inline
                                        type="checkbox"
                                        name="5"
                                        value={this.state.form.tags}
                                        onChange={this.handleChange.bind(this)}
                                    > Afternoon
                                    </Checkbox>

                                    <Checkbox
                                        inline
                                        type="checkbox"
                                        name="6"
                                        value={this.state.form.tags}
                                        onChange={this.handleChange.bind(this)}
                                    > Evening
                                    </Checkbox>


                                    {this.errorsFor('tags') &&
                                    <HelpBlock id="tags-help-block">{this.errorFor('tags')}</HelpBlock>
                                }
                                </FormGroup>
                                </Col>
                            </Row>

                            */}

                            <Row>
                                <Col xs={10} xsOffset={1}>
                                <FormGroup
                                    id = "image-form-group"
                                    validationState = {this.errorsFor('cost') && 'error'}>
                                    <ControlLabel id="image">Image</ControlLabel>
                                    <FormControl
                                        type="file"
                                        name="images"
                                        value={this.state.form.images}
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    {/*
                                    {this.errorsFor('cost') &&
                                    <HelpBlock id="cost-help-block">{this.errorFor('images')}</HelpBlock>
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


                        </div>

                </form>
            </div>
        );
    }
}

export default NewActivityForm;
