// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Globals
import variables from '../../tools/variables';

// Modules && General Components
import NavbarBootstrap from '../../components/navbar-bootstrap';
import LoggedInNav from '../../components/logged-in-navbar';
import { Col, FormGroup, Row, Checkbox } from 'react-bootstrap';
import Grid from '../../components/grid';

// Component Specfic Imports
import DateController from '../../controllers/DateController';
import TagController from '../../controllers/TagController';
import DateComponent from '../../components/date-component';

// Styles
import '../../../App.scss';
import './date-generator.scss';

// Documentation/Notes


const API = process.env.NODE_ENV === 'production'
    ? 'https://the-great-date-app.herokuapp.com'
    : 'http://localhost:3000'



class DateGenerator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				tags: {}
			},
			activities: [],
			tags: [],
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		DateController.fetchApprovedActivities().then((res) => {
			const {approvedActivities} = res;
			let limitedActivities = [];

			if (!approvedActivities) {
				return;
			}

			if (approvedActivities > 9) {
				for (var i = 0; i < 9; i++) {
					limitedActivities.push(approvedActivities[i]);
				}
				this.setState({activities: limitedActivities});
			} else {
				this.setState({activities: approvedActivities});
			}
		}).catch(e => console.log(e))


		TagController.fetchTags().then((resp) => {
			const {tags} = resp

			if (!tags) {
				return
			}

			this.setState({tags: tags})
		}).catch(e => console.log('mount catch:', e))
	}

	createTagCheckbox = (tag) => {
		return (
			<Checkbox
				inline
				type="checkbox"
				key={tag.id}
				name={tag.title}
				value={tag.id}
				onChange={this.toggleCheckbox.bind(this, tag.id)}
			>
				<span className="generatorTags">
					<i className="fas fa-tag"></i>
				<span className="generatorText">{tag.title}</span></span>
			</Checkbox>
		)
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

	toggleCheckbox = (tagID, event) => {
		const {form} = this.state;
		const {tags} = form;

		tags[tagID] = event.target.checked;

		form.tags = tags;

		this.setState({form});
	}

	handleChange(event) {
		const {form} = this.state;
		form[event.target.name] = event.target.value;
		this.setState({form});
	}

	handleSubmit() {
		const {form} = this.state;
		this.setState({randomSuccess: false});

		if (handleDateGenerator) {
			handleDateGenerator(form).then((res) => {
				DateController.fetchActivity(res.randomTag).then((res) => {
					this.setState({
						randomTag: res.activity.id,
						activity: res.activity,
						randomSuccess: true})
				})
			})
		} else {
			console.log("no onSubmit passed to date-generator");
		}
	}

	// FIXME: This should not be happening at this level, just needs to happen once at the App.js level with routes below
	isUserLoggedIn() {
		if (typeof localStorage.name === 'undefined') {
			return < NavbarBootstrap />;
		} else {
			return < LoggedInNav />;
		}
	}

	render() {
		const {activities} = this.state;

		return (
			<div className='home'>
				<div className="shadow">

					<div style={variables.backgroundStyle} className='titleBlock'>
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
							<button className='shuffle-btn' onClick={this.handleSubmit}>
								<span>
									Shuffle<i className="fas fa-random shuffleI"></i>
								</span>
							</button>
						</div>

					</div>

				</div>



				<div style={variables.backgroundTexture}>
					<br/>
					{this.state && this.state.randomSuccess
							? <DateComponent id={this.state.activity.id}/>
							: <Grid activities={activities}/>
					}


					<div className="see-more-contain">
						<Link to='/browse-dates'>
							<button className="success-btn">
								<span>See More</span>
							</button>
						</Link>
					</div>
				</div>

			</div>
		)
	}
}

export default DateGenerator;


// NOTE: Wtf is this doing down here hahaha
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
