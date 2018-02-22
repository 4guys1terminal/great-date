import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import '../App.css';
import DateInfo from '../components/date-info.js';
import LoggedInNav from '../components/logged-in-navbar';
import NavbarBootstrap from '../components/navbar-bootstrap.js';
import DateComponent from '../components/date-component.js';
import api from '../functions/fetch.js';
import imageFactory from '../functions/imgSrc.js';
import bgImage from '../functions/bgImage'

const host = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'
const path = "/user-uploads/"

const imgSrc = imageFactory(host, path)

const { fetchActivity } = api(host)

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};


class DatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const { id } = this.props.match.params

        fetchActivity(id).then((resp) => {
            this.setState({activity: resp.activity})
            console.log(this.state);
        })
    }

    isUserLoggedIn() {
        if (typeof localStorage.name === 'undefined') {
            return < NavbarBootstrap />;
        } else {
            return < LoggedInNav />;
        }
    }

    render() {
        const { activity } = this.state

        if (!activity) {
            return (
                <div className="container">
                    <div className="grid">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }

        const {imageName, title, description, location, cost} = activity
        console.log(imageName);

        return (<div style={bgImage}>
            <div className='datePageTest'>
                {this.isUserLoggedIn()}

                <DateComponent
                    image={imgSrc(imageName)}
                    title={title}
                    description={description}
                    location={location}
                    cost={cost}/>
            </div>

        </div>);
    }
}

export default DatePage
