import React, {Component} from 'react';
import '../App.css';
import TitleBlock from '../components/title-block.js';
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
                <div style={bgImage} className='titleBlock'>
                    {this.isUserLoggedIn()}

                    <TitleBlock/>

                </div>
            </div>

            <div style={backgroundTexture}>

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
