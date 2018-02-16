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
import {Redirect} from 'react-router-dom';
import api from '../functions/fetch.js';


const API = "http://localhost:3000"
const {fetchActivity} = api(API)


class DateGenerator extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        tags: {}
      },
      tags: []
    }
  }

    componentWillMount() {
        fetch(`${API}/tags`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({tags: resp.tags})
            console.log('tags imported',this.state.tags);
        })

    }

    handleChange(e) {
        const {form} = this.state
        form[e.target.name] = e.target.value
        this.setState({form: form})
    }

    createTagCheckbox = (tag) => {
        return (
            <Checkbox inline="inline" type="checkbox" key={tag.id} name={tag.title} value={tag.id} onChange={this.toggleCheckbox.bind(this, tag.id)}>
                {tag.title}
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

    handleSubmit() {
        const { onSubmit } = this.props
        const { form } = this.state

        if(onSubmit) {
            onSubmit(form)
            .then((resp) => {
                fetchActivity(resp.randomTag).then((resp) => {
                    console.log("this.state after send", this.state);
                    console.log('res',resp.activity.id);
                    this.setState({
                        randomTag: resp.activity.id,
                        activity: resp.activity,
                        randomSuccess: true,
                    })
                    console.log(this.state);
                })
            })
        } else {
            console.log("no onSubmit passed to date-generator");
        }
    }

    render() {
        const { randomSuccess } = this.state

        if(randomSuccess) {
            return <Redirect to={`/activities/${this.state.activity.id}`} />
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
                        <FormGroup
                            id = "tags-form-group">
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
                    </form>
                </div>


                <Button
                bsSize = "large"
                id = "submit"
                className = 'date-btn'
                onClick = {
                    this.handleSubmit.bind(this)
                } > Shuffle</Button>


      </div>);

    }
}

export default DateGenerator;

// const tags = Object.assign([], this.state.tags)
// tags.push(resp.tag)
//
// console.log("tags",tags);
// console.log("resp.tag",resp.tag)
