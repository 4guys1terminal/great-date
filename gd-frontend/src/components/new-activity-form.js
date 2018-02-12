import React, { Component } from 'react';
import '../App.css';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    Row,
    HelpBlock,
    Alert,
    Radio
} from 'react-bootstrap';
import CheckboxComponent from './checkbox.js';

const tagExamples = [
    {tagTitle: 'Romantic', tagId: '1'},
    {tagTitle: 'Thrilling', tagId: '2'},
    {tagTitle: 'Morning', tagId: '3'},
    {tagTitle: 'Afternoon', tagId: '4'},
    {tagTitle: 'Evening', tagId: '5'},
    {tagTitle: 'Outdoors', tagId: '6'}
];


class NewActivityForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                title: '',
                description: '',
                location: '',
                cost: '',
                tags: [],
                image: ''
            }
        }
        this.errorsFor = this.errorsFor.bind(this);
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    handleChange(event){
        const formState = Object.assign({}, this.state.form)
        //if type===checkbox then do the weird tag push thing (one possible solution?)
        formState[event.target.name] = event.target.value
        this.setState({form: formState})
    }

    handleSubmit(){
        console.log(this.selectedCheckboxes);
        this.props.onSubmit(this.state.form);
        console.log(this.state.form);
    }

    errorsFor(attribute){
        var errorString = "";
        if(this.props.errors){
            const errors = this.props.errors.filter(error => error.param === attribute)
            if(errors){
                errorString = errors.map(error => error.msg ).join(", ")
            }
        }
        return errorString === "" ? null : errorString
    }


    createTagCheckbox = (tagExample) => {
        return <CheckboxComponent
            tagId={tagExample.tagId}
            tagTitle={tagExample.tagTitle}
            handleCheckboxChange={this.toggleCheckbox}
            key={tagExample.tagTitle}
        />
    }

    createTagCheckboxes = () => {
        return tagExamples.map(this.createTagCheckbox)
    }

    toggleCheckbox = (tagId) =>{
        if (this.selectedCheckboxes.has(tagId)) {
            this.selectedCheckboxes.delete(tagId);
        } else {
            this.selectedCheckboxes.add(tagId);
        }
        const tagsArray = Array.from(this.selectedCheckboxes)
        this.setState({
            tags: tagsArray
        })
    }


    // const newTags = this.state.form.tags
    // for(const checkbox of this.selectedCheckboxes){
    //         newTags.push(checkbox);
    //     }
    // this.setState({
    //     tags: newTags
    // })

    // handleChange(event){
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
                                    <option value="pacific_beach">Pacific Beach</option>
                                    <option value="downtown">Downtown</option>
                                    <option value="point_loma">Point Loma</option>
                                    <option value="north_park">North Park</option>

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

                                    <Radio inline name="cost" value="free">Free</Radio>
                                    <Radio inline name="cost" value="$">$</Radio>
                                    <Radio inline name="cost" value="$$">$$</Radio>
                                    <Radio inline name="cost" value="$$$">$$$</Radio>

                                    {/*
                                        <FormControl
                                            componentClass="radio"
                                            placeholder="Average Cost"
                                            name="cost"
                                            value={this.state.form.cost}
                                            onChange={this.handleChange.bind(this)}
                                        >


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
