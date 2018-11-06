import React, {Component} from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import LoggedInNav from '../../components/logged-in-navbar';
import NavbarBootstrap from '../../components/navbar-bootstrap.js';
import DateComponent from '../../components/date-component.js';
import fetches from '../../functions/fetch.js';
// import imageFactory from '../../functions/imgSrc.js';
import bgImage from '../../functions/bgImage'

// const host = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'
// const path = "/user-uploads/"
//
// const imgSrc = imageFactory(host, path)

const { fetchActivity } = fetches


class DatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const { id } = this.props.match.params

        fetchActivity(id)
        .then((res) => {
            const { activity } = res

            if(!activity) {
              return
            }

            this.setState({activity: activity})
        }).catch(e => console.log('mount catch:', e))
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

        return (
            <div style={bgImage}>
                <div className='datePageTest'>
                    {this.isUserLoggedIn()}

                    <DateComponent
                        id={this.state.activity.id}/>

                    <Link to='/all-dates-page' id='all-dates-back' className='back-button'>
                        <Button className='back-button' bsStyle='primary' bsSize='large'>Back</Button>
                    </Link>

                </div>
            </div>
        );
    }
}

export default DatePage