// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Globals
import variables from '../../tools/variables';
import DateController from '../../controllers/DateController';

// Modules && General Components
import LoggedInNav from '../../components/logged-in-navbar';
import NavbarBootstrap from '../../components/navbar-bootstrap';
import Grid from "../../modules/grid/";

// Component Specfic Imports
import Title from '../../components/title';

// Styles
import '../../../App.scss';

// Documentation/Notes


class Home extends Component {
    constructor(props) {
		super(props);

        this.state = {
            activities: [],
            tags: []
        }
    }

    componentDidMount() {
		DateController.fetchApprovedActivities()
			.then((res) => {
				const { approvedActivities } = res;
				let limitedActivities = [];

				if(!approvedActivities) {
					return
				}

				if (approvedActivities > 9) {
					for (var i = 0; i < 9; i++) {
						limitedActivities.push(approvedActivities[i])
					}

					this.setState({
						approvedActivities: limitedActivities
					})
				} else {
					this.setState({
						activities: approvedActivities
					})
				}
			})
			.catch(e => console.log(e))
	}

	isUserLoggedIn() {
		if (typeof localStorage.name === 'undefined') {
			return <NavbarBootstrap />;
		} else {
			return <LoggedInNav />;
		}
	}

	render() {
		const { activities } = this.state;

		return (
			<div className='home'>
				<div className="shadow">
					<div
						style={variables.backgroundStyle}
						className='titleBlock'
					>
						{this.isUserLoggedIn()}
						<Title />
					</div>
				</div>

				<div style={variables.backgroundTexture}>
					<br/>
				<div className="instContainer">
					<div className="instGrid">
						<div className="instCell hvr-grow-shadow">
							<div className="instText">
								<h2>Step 1</h2>
								<h3>
									Set your ideal date preferences... or get spontaneous and let
									Great Date decide for you.
								</h3>
							</div>
						</div>

						<div className="instCell hvr-grow-shadow">
							<div className="instText">
								<h2>Step 2</h2>
								<h3>Click the shuffle button and...</h3>
							</div>
						</div>

						<div className="instCell hvr-grow-shadow">
							<div className="instText">
								<h2>Step 3</h2>
								<h3>Go have yourself a Great Date!</h3>
							</div>
						</div>
					</div>
				</div>

					<div className="browse-title">
						<Link to='/browse-dates' id='browse-dates-link' className='browse-title'>Browse Dates</Link>
					</div>

					<div className="line-contain">
						<div className="line"></div>
					</div>

					<Grid activities={activities}/>

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

export default Home;
