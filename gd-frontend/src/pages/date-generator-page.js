import React, {Component} from 'react';
import '../App.css';
import {Link, Redirect,} from 'react-router-dom';
import Grid from '../components/grid';
import {Col, FormGroup, Row, Checkbox} from 'react-bootstrap';

import LoggedInNav from '../components/logged-in-navbar';
import fetches from '../functions/fetch.js';
import bgImage from '../functions/bgImage'
import NavbarBootstrap from '../components/navbar-bootstrap.js';
import DateComponent from '../components/date-component.js';

const {fetchActivities, fetchTags, fetchActivity,} = fetches

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

const API = process.env.NODE_ENV === 'production'
    ? 'https://the-great-date-app.herokuapp.com'
    : 'http://localhost:3000'

class DateGeneratorPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                tags: {}
            },
            activities: [],
            tags: [],
        }
    }

    componentWillMount() {
        fetchActivities().then((res) => {
            const {activities} = res
            let limitedActivities = []

            if (!activities) {
                return
            }

            if (activities > 9) {
                for (var i = 0; i < 9; i++) {
                    limitedActivities.push(activities[i])
                }
                this.setState({activities: limitedActivities})
            } else {
                this.setState({activities: activities})
            }
        }).catch(e => console.log(e))


        fetchTags().then((resp) => {
            const {tags} = resp

            if (!tags) {
                return
            }

            this.setState({tags: tags})
        }).catch(e => console.log('mount catch:', e))
    }

    createTagCheckbox = (tag) => {
        return (<Checkbox inline type="checkbox" key={tag.id} name={tag.title} value={tag.id} onChange={this.toggleCheckbox.bind(this, tag.id)}>
            <span className="generatorTags">
                <i className="fas fa-tag"></i>
            <span className="generatorText">{tag.title}</span></span>
        </Checkbox>)
    }

    createTagCheckboxes = () => {
        const {tags} = this.state

        if (!tags) {
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
        const {form} = this.state

        if (handleDateGenerator) {
            handleDateGenerator(form).then((res) => {
                fetchActivity(res.randomTag).then((res) => {
                    this.setState({randomTag: res.activity.id, activity: res.activity, randomSuccess: true})
                })
            })
        } else {
            console.log("no onSubmit passed to date-generator");
        }
    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavbarBootstrap />;
        } else {
            return < LoggedInNav />;
        }
    }

    render() {
        const {randomSuccess} = this.state
        const {activities} = this.state

        return (<div className='home'>
            <div className="shadow">

                <div style={bgImage} className='titleBlock'>
                    {this.isUserLoggedIn()}

                    <div className='date-generator'>
                        <h1>
                            Date Generator
                        </h1>

                        <br/>
                        <br/>
                        <div className="createDateDiv">
                            <form className="createDateForm">
                                <Row>
                                    <Col xs={8}>
                                        <FormGroup id='tags-form-group'>
                                            <br/>

                                        <div className='checkbox-container'>
                                            {this.createTagCheckboxes()}
                                        </div>

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </form>

                        </div>
                        <button id='submit' className='shuffle-btn' onClick={this.handleSubmit.bind(this)}>
                            <span>
                                Shuffle
                                <i className="fas fa-random"></i>
                            </span>
                        </button>
                    </div>

                </div>

            </div>



            <div style={backgroundTexture}>
                <br/>
                {
                    this.state && this.state.randomSuccess
                        ? <DateComponent id={this.state.activity.id}/>
                        : <Grid activities={activities}/>
                }


                <div className="see-more-contain">
                    <Link to='/all-dates-page'>
                        <button className="success-btns">
                            <span>See More</span>
                        </button>
                    </Link>
                </div>
            </div>

        </div>)
    }
}

export default DateGeneratorPage;

function handleDateGenerator(params) {
    return fetch(`${API}/api/home`, {
        method: "POST", //specifying our correct endpoint in the server
        headers: { //specifying that we're sending JSON, and want JSON back
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
    }).then((resp) => { //stringifying json for the fetch
        return resp.json()
    }).catch(e => console.log("ERROR/api/home", e))
}
