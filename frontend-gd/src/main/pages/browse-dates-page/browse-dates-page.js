// React Imports
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import {Col, FormGroup, Checkbox, Row} from 'react-bootstrap';

// Globals
import Controller from '../../tools/Controller'
import variables from '../../tools/variables';

// Modules && General Components
import LoggedInNav from '../../modules/nav-bar/logged-in-navbar.js';
import NavbarBootstrap from '../../modules/nav-bar/navbar-bootstrap.js';
import Grid from '../../modules/grid';

// Component Specfic Imports
// Styles
import './browse-dates-page.scss'
// Documentation/Notes

class BrowseDatesPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			form: {
				tags: {}
			},
			tags: [],
			exclusiveActivities: [],
			inclusiveActivities: [],
			browseResp: false
		}
	}

	componentDidMount = () => {
		this.loadData();
	}

	loadData = () => {
		Controller.fetchTags().then(res => {
			const { tags } = res;

			if (!tags) {
				return;
			}

			this.setState({tags: tags})
		})

		Controller.fetchApprovedActivities().then((res) => {
			const { approvedActivities } = res;

			if (!approvedActivities) {
				return;
			}

			this.setState({
				allActivities: approvedActivities,
			})
		})
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
			return (
				<div>
					{
						<Link to='/create-date-redirect'>
							<button className="newActivityButton">Create New Date</button>
						</Link>
					}
				</div>
			)
		} else {
			return (
				<div>
					{
						<Link to='/new-date'>
							<button className="newActivityButton">Create New Date</button>
						</Link>
					}
				</div>
			)
		}
	}

	toggleCheckbox = (tagID, e) => {
		let formCopy = Object.assign({}, this.state.form)

		formCopy.tags[tagID] = e.target.checked;

		this.setState({form: formCopy})
	}

	createExclusive = () => {
		const { exclusiveActivities } = this.state;

		if (exclusiveActivities.length === 0) {
			return (
				<h4>No dates exactly matched your search! Please pick different options and try again.</h4>
			)
		} else {
			return (
				<Grid activities={exclusiveActivities}/>
			)
		}
	}

	renderGrids = () => {
		const {browseResp, allActivities, inclusiveActivities,} = this.state;

		if (browseResp === true) {
			return (
				<div>
					<h3>Dates that exactly match:</h3>
					{this.createExclusive()}
					<h3>All dates that match your tags:</h3>
					<Grid activities={inclusiveActivities}/>
				</div>
			)
		} else {
			return (
				<div>
					<Grid activities={allActivities}/>
				</div>
			)
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
	createTagCheckbox = (tag) => {
		return (
			<Checkbox inline type="checkbox" key={tag.id} name={tag.title} value={tag.id} onChange={this.toggleCheckbox.bind(this, tag.id)}>
				<span className="generatorTags"><i className="fas fa-tag"></i>{tag.title}</span>
			</Checkbox>
		)
	}

	createTagCheckboxes = () => {
		const {tags} = this.state;

		if (!tags) {
			return
		}

		return tags.map((tag) => {
			return this.createTagCheckbox(tag)
		})
	}

	handleSubmit() {
		Controller.fetchActivityByTags(this.state.form)
			.then((res) => {
				const { allActivities } = this.state;
				let exclusiveActivities = [];
				let inclusiveActivities = [];

				for (let i = 0; i < allActivities.length; i++) {
					if (res.exclusiveIds.includes(allActivities[i].id)) {
						exclusiveActivities.push(allActivities[i]);
					}
				}

				for (let i = 0; i < allActivities.length; i++) {
					if (res.inclusiveIds.includes(allActivities[i].id)) {
						inclusiveActivities.push(allActivities[i]);
					}
				}

				this.setState({
					exclusiveActivities,
					inclusiveActivities,
					browseResp: true
				})
			})
	}

	render() {
		return (
			<div>
				<div style={variables.backgroundStyle}>

					{this.isUserLoggedIn()}

					<div>

						<h1>Browse All Dates</h1>

						<div className="new-date-form">
							<form className="create-date-form">
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
						<button id='submit' className='success-btn' onClick={this.handleSubmit.bind(this)}>
							<span>
								Select Tags
							</span>
						</button>


						<div style={variables.backgroundTexture} className='browse-dates-page'>

							{this.renderGrids()}

							{this.renderCreateButton()}
						</div>

					</div>

				</div>
			</div>
		);
	}
}

export default BrowseDatesPage;
