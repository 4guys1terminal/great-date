import React, {Component} from 'react';
import Grid from '../components/grid.js';

import {Col, FormGroup, Checkbox, Row,} from 'react-bootstrap'
import LoggedInNav from '../components/logged-in-navbar';
import NavbarBootstrap from '../components/navbar-bootstrap.js';
import bgImage from '../functions/bgImage'
import {Link} from 'react-router-dom';
import fetches from '../functions/fetch.js';

const {fetchTags, fetchActivities,} = fetches

const API = process.env.NODE_ENV === 'production'
    ? 'https://the-great-date-app.herokuapp.com'
    : 'http://localhost:3000'

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
            tags: []
        }
    }

    componentWillMount() {

        fetchTags().then((res) => {
            const {tags} = res

            if (!tags) {
                return
            }

            this.setState({tags: tags})
        }).catch(e => console.log(e))

        fetchActivities().then((res) => {
            const {activities} = res

            if (!activities) {
                return
            }

            this.setState({allActivities: activities})
        }).catch(e => console.log(e))
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
        return (<Checkbox inline type="checkbox" key={tag.id} name={tag.title} value={tag.id} onChange={this.toggleCheckbox.bind(this, tag.id)}>
            <span className="generatorTags">
                <i className="fas fa-tag"></i>
                {tag.title}</span>
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

    createExclusive = () => {
        const { exclusiveActivities } = this.state

        if (exclusiveActivities.length === 0) {
            return <h4>No dates exactly matched your search! Please pick different options and try again.</h4>
        } else {
            return (<Grid
                    activities={exclusiveActivities}
                />)
        }
    }

    renderGrids = () => {
        const {browseResp, allActivities, inclusiveActivities,} = this.state

        if (browseResp === true) {
            return (<div>
                <h3>Dates that exactly match:</h3>

            {this.createExclusive()}


                <h3>All dates that match your tags:</h3>
                <Grid activities={inclusiveActivities}/>
            </div>)
        } else {
            return (<div>
                <Grid activities={allActivities}/>
            </div>)
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
            body: JSON.stringify(form)
        }).then((res) => { //stringifying json for the fetch
            return res.json()
        }).then((res) => {
            const {allActivities} = this.state
            let exclusiveActivities = []
            let inclusiveActivities = []

            for (let i = 0; i < allActivities.length; i++) {
                if (res.exclusiveIds.includes(allActivities[i].id)) {
                    exclusiveActivities.push(allActivities[i])
                }
            }

            for (let i = 0; i < allActivities.length; i++) {
                if (res.inclusiveIds.includes(allActivities[i].id)) {
                    inclusiveActivities.push(allActivities[i])
                }
            }

            this.setState({
                exclusiveActivities: exclusiveActivities,
                inclusiveActivities: inclusiveActivities,
                browseResp: true
            })
        }).catch((e) => console.log("error:", e))
    }

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
                                        <br/> {this.createTagCheckboxes()}

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


                    <div style={backgroundTexture} className='all-dates-page'>

                        {this.renderGrids()}

                        {this.renderCreateButton()}
                    </div>

                </div>

            </div>
        </div>);
    }
}

export default AllDatesPage;
