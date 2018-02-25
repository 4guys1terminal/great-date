import React, {Component} from 'react';
import '../App.css';
import {
    Col,
    FormGroup,
    Row,
    Checkbox,
} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import fetches from '../functions/fetch.js';

const {fetchActivity, fetchTags} = fetches

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
            const { tags } = resp

            if(!tags) {
              return
            }

            this.setState({
              tags: tags
            })
        }).catch(e => console.log('mount catch:', e))
    }

    createTagCheckbox = (tag) => {
        return (
          <Checkbox inline type="checkbox" key={tag.id} name={tag.title} value={tag.id} onChange={this.toggleCheckbox.bind(this, tag.id)}>
              <span className="generatorTags">
                  <i className="fas fa-tag"></i>
                  {tag.title}</span>
          </Checkbox>
        )
    }

    createTagCheckboxes = () => {
      const { tags } = this.state

      if(!tags) {
        return
      }

        return tags.map((tag) => {
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
            onSubmit(form).then((res) => {
                fetchActivity(res.randomTag).then((res) => {
                    this.setState({randomTag: res.activity.id, activity: res.activity, randomSuccess: true,})
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

                                </FormGroup>
                            </Col>
                        </Row>
                    </form>

                </div>
                <button id='submit' className='success-btns' onClick={this.handleSubmit.bind(this)}>
                    <span>
                        Shuffle
                    </span>
                </button>
            </div>
        );
    }
}

export default DateGenerator;
