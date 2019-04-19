// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Globals
import Controller from '../../tools/Controller';
import variables from '../../tools/variables';

// Modules && General Components
import NavbarBootstrap from '../../modules/nav-bar/navbar-bootstrap';
import LoggedInNav from '../../modules/nav-bar/logged-in-navbar';
import Grid from '../../modules/grid';
import { FormControlLabel, Checkbox } from '@material-ui/core'; 

// Component Specfic Imports
import DateComponent from '../../modules/date-component/';

// Styles
import '../../../App.scss';
import './date-generator.scss';

// Documentation/Notes

// NOTE: leave this for now, will have to figure out what 'handleDateGenerator' function is actually doing later
const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000';


// NOTE: update - still have no clue what's going on or why this is outside the component, but at least it's not below the export now.
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

	componentDidMount() {
		Controller.fetchApprovedActivities()
			.then(res => {
				const { approvedActivities } = res;
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
			})

		Controller.fetchTags().then((resp) => {
			const {tags} = resp

			if (!tags) {
				return
			}

			this.setState({tags: tags})
		}).catch(e => console.log('mount catch:', e))
	}

	createTagCheckboxes = () => {
		const { tags } = this.state;

		if (!tags) {
			return;
		}

		return this.state.tags.map(({id, title}) => {
			return (
				 <FormControlLabel
				 	key={id}
					control={
						<Checkbox
							checked={this.state.data.tags[id]}
							onChange={this.toggleCheckbox.bind(this, id)}
							value={id}
							color="primary"
						/>
					}
					label={title}
				/>
			)
		});
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
				Controller.fetchActivity(res.randomTag).then((res) => {
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
							<div className="new-date-form">
								<form className="create-date-form">
									{/* <Row>
										<Col xs={8}>
											<FormGroup id='tags-form-group'> */}
												<br/>

											<div className='checkbox-container'>
												{this.createTagCheckboxes()}
											</div>

											{/* </FormGroup>
										</Col>
									</Row> */}
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
