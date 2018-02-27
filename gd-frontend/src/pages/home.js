import React, {Component} from 'react';
import '../App.css';
import Title from '../components/title.js';
import {Link} from 'react-router-dom';
import Grid from '../components/grid';
import LoggedInNav from '../components/logged-in-navbar';
import fetches from '../functions/fetch.js';
import bgImage from '../functions/bgImage'
import NavbarBootstrap from '../components/navbar-bootstrap.js';


const { fetchActivities } = fetches

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};



class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            tags: []
        }
    }

    componentWillMount() {
        fetchActivities()
        .then((res) => {
            const { activities } = res
            let limitedActivities = []

            if(!activities) {
              return
            }

            if (activities > 9) {
                for (var i = 0; i < 9; i++) {
                    limitedActivities.push(activities[i])
                }
                this.setState({
                  activities: limitedActivities
                })
            } else {
                this.setState({
                  activities: activities
                })
            }
        })
        .catch(e => console.log(e))
    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavbarBootstrap />;
        } else {
            return < LoggedInNav />;
        }
    }

    render() {
        const {activities} = this.state

        return (
            <div className='home'>
                <div className="shadow">
                    <div
                        style={bgImage}
                        className='titleBlock'>
                        {this.isUserLoggedIn()}

                            <Title />

                    </div>
                </div>

            <div style={backgroundTexture}>
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
                    <Link to='/all-dates-page' id='all-dates-link' className='browse-title'>Browse Dates</Link>
                </div>

                <div className="line-contain">
                    <div className="line"></div>
                </div>

                <Grid activities={activities}/>

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

export default Home;
