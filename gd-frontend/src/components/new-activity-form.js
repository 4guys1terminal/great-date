import React, { Component } from 'react';
import '../App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    Row,
    HelpBlock,
    Alert,
    Checkbox
} from 'react-bootstrap';
import NavBar from '../components/navbar.js';


class NewActivityForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                title: '',
                description: '',
                location: '',
                cost: '',
                tags: '',
                image: ''
            }
        }
    }

    handleChange(event){
        const formState = Object.assign({}, this.state.form)
        formState[event.target.name] = event.target.value
        this.setState({form: formState})
    }

    // need to attach this new activity component somewhere
    handleSubmit(){
        this.props.onSubmit(this.state.form)
        console.log(this.state.form);
    }

    errorsFor(attribute){
        var errorString = ''
        if(this.props.errors){
            const errors = this.props.errors.filter(error => error.param === attribute)
            if(errors){
                errorString = errors.map(error => error.msg ).join(", ")
            }
        }
        return errorString === "" ? null : errorString
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

                        <div class='forms'>
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
                                    {this.errorsFor('title') &&
                                    <HelpBlock id="title-help-block">{this.errorFor('title')}</HelpBlock>
                                }
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
                                    {this.errorsFor('description') &&
                                    <HelpBlock id="description-help-block">{this.errorFor('description')}</HelpBlock>
                                }
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
                                    <option value="pacific_beach">Pacific Beach</option>
                                    <option value="downtown">Downtown</option>
                                    <option value="point_loma">Point Loma</option>
                                    <option value="north_park">North Park</option>

                                    </FormControl>


                                    {this.errorsFor('location') &&
                                    <HelpBlock id="location-help-block">{this.errorFor('location')}</HelpBlock>
                                }
                                </FormGroup>
                                </Col>
                            </Row>


                            <Row>
                                <Col xs={10} xsOffset={1}>
                                <FormGroup
                                    id = "cost-form-group"
                                    validationState = {this.errorsFor('cost') && 'error'}>
                                    <ControlLabel id="cost">Cost</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        placeholder="Average Cost"
                                        name="cost"
                                        value={this.state.form.cost}
                                        onChange={this.handleChange.bind(this)}
                                    >

                                    <option value="avg_cost">Average Cost</option>
                                    <option value="free">Free</option>
                                    <option value="$">$</option>
                                    <option value="$$">$$</option>
                                    <option value="$$$">$$$</option>

                                    </FormControl>

                                    {this.errorsFor('cost') &&
                                    <HelpBlock id="cost-help-block">{this.errorFor('cost')}</HelpBlock>
                                }
                                </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={10} xsOffset={1}>
                                <FormGroup
                                    id = "tags-form-group"
                                    validationState = {this.errorsFor('cost') && 'error'}>
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

                                    {this.errorsFor('cost') &&
                                    <HelpBlock id="cost-help-block">{this.errorFor('tags')}</HelpBlock>
                                }
                                </FormGroup>
                                </Col>
                            </Row>

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
                                    {this.errorsFor('cost') &&
                                    <HelpBlock id="cost-help-block">{this.errorFor('images')}</HelpBlock>
                                }
                                </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={10} xsOffset={1}>
                                    <Button
                                        id="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                        >Make Activity</Button>
                                </Col>
                            </Row>


                        </div>

                </form>
            </div>
        );
    }
}

export default NewActivityForm;
