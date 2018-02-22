import React, {Component} from 'react';
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
    Checkbox,
} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import fetches from '../functions/fetch.js';

const {fetchActivity, fetchTags} = fetches()


class DateGenerator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                tags: {}
            },
            tags: [],
        }
    }

    componentWillMount() {
        fetchTags()
        .then((resp) => {
            this.setState({tags: resp.tags})
            console.log('tags imported', this.state.tags);
        })
    }

    createTagCheckbox = (tag) => {
        return (<Checkbox inline="inline" type="checkbox" key={tag.id} name={tag.title} value={tag.id} onChange={this.toggleCheckbox.bind(this, tag.id)}>
            <span className="generatorTags">
                <i class="fas fa-tag"></i>
                {tag.title}</span>
        </Checkbox>)
    }

    createTagCheckboxes = () => {
        return this.state.tags.map((tag) => {
            return this.createTagCheckbox(tag)
        })
    }

    toggleCheckbox = (tagID, e) => {
        const {form} = this.state
        const {tags} = form

        tags[tagID] = e.target.checked

        form.tags = tags

        this.setState({form: form})
    }

    handleChange(e) {
        const {form} = this.state
        form[e.target.name] = e.target.value
        this.setState({form: form})
    }

    handleSubmit() {
        const {onSubmit} = this.props
        const {form} = this.state

        if (onSubmit) {
            onSubmit(form).then((resp) => {
                fetchActivity(resp.randomTag).then((resp) => {
                    this.setState({randomTag: resp.activity.id, activity: resp.activity, randomSuccess: true,})
                })
            })
        } else {
            console.log("no onSubmit passed to date-generator");
        }
    }

    render() {
        const {randomSuccess} = this.state

        if (randomSuccess) {
            return <Redirect to={`/activities/${this.state.activity.id}`}/>
        }

        return (
            <div className='date-generator'>
                <h1>
                    Date Generator
                </h1>

                <br/>
                <br/>
                <div className="createDateDiv">
                    <form className="createDateForm">
                        <Row>
                            <Col xs={10} xsOffset={1}>
                                <FormGroup id='tags-form-group'>
                                    <br/> {this.createTagCheckboxes()}

                                    {/*
                                        {this.errorsFor('tags') && <HelpBlock id="tags-help-block">{this.errorFor('tags')}</HelpBlock>}
                                        */
                                    }

                                </FormGroup>
                            </Col>
                        </Row>
                    </form>

                </div>
                <button bsSize='large' id='submit' className='success-btns' onClick={this.handleSubmit.bind(this)}>
                    <span>
                        Shuffle
                    </span>
                </button>
            </div>
        );
    }
}

export default DateGenerator;

// browse page stuff
//
// const tags = Object.assign([], this.state.tags)
// tags.push(resp.tag)
//
// console.log("tags",tags);
// console.log("resp.tag",resp.tag)
