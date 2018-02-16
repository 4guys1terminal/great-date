import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import '../App.css';
import DateInfo from '../components/date-info.js';
import NavBar from '../components/navbar.js';
import NavbarBootstrap from '../components/navbarBootstrap.js';
import imageFactory from '../components/imgSrc.js';
import DateComponent from '../components/date-component.js';
import api from '../components/fetch'

const host = "http://localhost:3000"
const path = "/user-uploads/"

const imgSrc = imageFactory(host, path)

const { fetchActivity } = api(host)

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};

var bgImage = {
    backgroundImage: 'linear-gradient(to bottom, rgb(13,194,181) 0%, rgb(13,186,237) 100%)',
    backgroundSize: 'cover'
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
                <NavbarBootstrap/>

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
