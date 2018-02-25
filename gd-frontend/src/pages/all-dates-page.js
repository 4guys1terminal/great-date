import React, {Component} from 'react';
import Grid from '../components/grid.js';

import {
    Col,
    FormGroup,
    Checkbox,
    Row
} from 'react-bootstrap'
import LoggedInNav from '../components/logged-in-navbar';
import NavbarBootstrap from '../components/navbar-bootstrap.js';
import bgImage from '../functions/bgImage'
import { Link } from 'react-router-dom';
import fetches from '../functions/fetch.js';

const { fetchTags, fetchActivities } = fetches

const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

class AllDatesPage extends Component {
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
        })
        .catch(e => console.log(e))

        fetchActivities()
        .then((resp) => {
          const { activities } = resp

            if(!activities) {
              return
            }

            this.setState({
              activities: activities
            })
        })
        .catch(e => console.log(e))
    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return <NavbarBootstrap/>;
        } else {
            return <LoggedInNav/>;
        }
    }

    renderCreateButton() {
        if (typeof localStorage.name === 'undefined') {
            return <div>
                {
                    <Link to='/sign-up-page'>
                            <button className="newActivityButton">Create New Date</button>
                        </Link>
                }
            </div>
        } else {
            return <div>
                {
                    <Link to='/new-activity'>
                            <button className="newActivityButton">Create New Date</button>
                        </Link>
                }
            </div>
        }
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

    renderGrid = () => {
        const { browseResp, activities, exclusiveActivities, inclusiveActivities } = this.state

        if (browseResp === true) {
            return <div>
                <Grid
                    activities={exclusiveActivities}
                />

                <Grid
                    activities={inclusiveActivities}
                />
            </div>
        } else {
            return <div>
                <Grid
                    activities={activities}
                />
            </div>
        }
    }

    handleChange(e) {
        const {form} = this.state
        form[e.target.name] = e.target.value
        this.setState({form: form})
    }

    // handleSubmit() {
    //     const {onSubmit} = this.props
    //     const {form} = this.state
    //
    //     if (onSubmit) {
    //         onSubmit(form).then((resp) => {
    //             fetchActivity(resp.randomTag).then((resp) => {
    //                 this.setState({randomTag: resp.activity.id, activity: resp.activity, randomSuccess: true})
    //             })
    //         })
    //     } else {
    //         console.log("no onSubmit passed to date-generator");
    //     }
    // }

    handleSubmit() {
        const {form} = this.state
        fetch(`${API}/api/browse`, {
            method: "POST", //specifying our correct endpoint in the server
            headers: { //specifying that we're sending JSON, and want JSON back
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form),
        }).then((res) => { //stringifying json for the fetch
            console.log('success');
            res.json()
        }).then((res) => {
            console.log(res.inclusiveIds);
            console.log(res.exclusiveIds);
            this.setState({
                browseResp: true
            })
        }).catch( (e) => console.log("error:", e))
    }

    // handleBrowse(params) {
    //     return fetch(`${API}/browse`, {
    //         method: "POST", //specifying our correct endpoint in the server
    //         headers: { //specifying that we're sending JSON, and want JSON back
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(params),
    //     }).then((resp) => { //stringifying json for the fetch
    //         return resp.json()
    //     })
    // }

    render() {
        return (<div>
            <div style={bgImage}>

                {this.isUserLoggedIn()}

                <div>

                    <h1>Browse All Dates</h1>

                    <div className="createDateDiv">
                        <form className="createDateForm">
                            <Row>
                                <Col xs={10} xsOffset={1}>
                                    <FormGroup id='tags-form-group'>
                                        <br/>

                                        {this.createTagCheckboxes()}

                                        {/*
                                            {this.errorsFor('tags') && <HelpBlock id="tags-help-block">{this.errorFor('tags')}</HelpBlock>}
                                            */
                                        }

                                    </FormGroup>
                                </Col>
                            </Row>
                        </form>

                    </div>
                    <button id='submit' className='success-btns' onClick={this.handleSubmit.bind(this)}>
                        <span>
                            Select Tags
                        </span>
                    </button>

                    {/* will need to adjust all of this to give us browse options */}

                    {/* <ToggleButtonGroup type="checkbox" bsSize='large' className="search-tags">
                        <ToggleButton value={1}>Romantic</ToggleButton>
                        <ToggleButton value={2}>Thrilling</ToggleButton>
                        <ToggleButton value={3}>Outdoors</ToggleButton>
                        <ToggleButton value={4}>Fancy</ToggleButton>
                        <ToggleButton value={5}>Morning</ToggleButton>
                        <ToggleButton value={6}>Afternoon</ToggleButton>
                        <ToggleButton value={7}>Evening</ToggleButton>
                        </ToggleButtonGroup> */
                    }

                    <div style={backgroundTexture} className='all-dates-page'>


                        {this.renderGrid()}
                        {/* <Grid
                            activities={this.state.exclusiveActivities}
                        />

                        <Grid
                            activities={this.state.inclusiveActivities}
                        /> */}


                        {this.renderCreateButton()}
                    </div>
                </div>

            </div>
        </div>);
    }
}

export default AllDatesPage;
