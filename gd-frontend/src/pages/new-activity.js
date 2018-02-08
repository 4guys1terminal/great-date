import React, { Component } from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom';
import AllDatesPage from './pages/all-dates-page.js';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    Row,
    HelpBlock,
    Alert
} from 'react-bootstrap';

class NewActivity extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                title: '',
                description: '',
                location: '',
                cost: ''
            }
        }
    }

    handleChange(event){
        const formState = Object.assign({}, this.state.form)
        formState[event.target.name] = event.target.value
        this.setState({form: formState})
    }

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
            <form>

                <Row>
                    <Col xs={6}>
                        {this.props.errors &&
                            <Alert bsStyle="danger">
                                Please check the form and try again.
                            </Alert>
                        }
                    </Col
                </Row>

                <div class='forms'>
                    <Row>
                        <Col xs={6}>
                        <FormGroup
                            id = "title-form-group"
                            validationState = {this.errorsFor('title') && 'error'}>
                            <ControlLabel id="title">Title</ControlLabel>
                            <FormControl
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
                        <Col xs={6}>
                        <FormGroup
                            id = "description-form-group"
                            validationState = {this.errorsFor('description') && 'error'}>
                            <ControlLabel id="description">Description</ControlLabel>
                            <FormControl
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
                        <Col xs={6}>
                        <FormGroup
                            id = "location-form-group"
                            validationState = {this.errorsFor('location') && 'error'}>
                            <ControlLabel id="location">Location</ControlLabel>
                            <FormControl
                                type="text"
                                name="location"
                                value={this.state.form.location}
                                onChange={this.handleChange.bind(this)}
                            />
                            {this.errorsFor('location') &&
                            <HelpBlock id="location-help-block">{this.errorFor('location')}</HelpBlock>
                        }
                        </FormGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={6}>
                        <FormGroup
                            id = "cost-form-group"
                            validationState = {this.errorsFor('cost') && 'error'}>
                            <ControlLabel id="cost">Cost</ControlLabel>
                            <FormControl
                                type="text"
                                name="cost"
                                value={this.state.form.cost}
                                onChange={this.handleChange.bind(this)}
                            />
                            {this.errorsFor('cost') &&
                            <HelpBlock id="cost-help-block">{this.errorFor('cost')}</HelpBlock>
                        }
                        </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <Button
                                id="submit"
                                onClick={this.handleSubmit.bind(this)}
                                >Make Activity</Button>
                        </Col>
                    </Row>


                </div>

            </form>
        );
    }
}

export default NewActivity;
