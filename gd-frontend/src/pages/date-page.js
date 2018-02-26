import React, {Component} from 'react';
import '../App.css';
import LoggedInNav from '../components/logged-in-navbar';
import NavbarBootstrap from '../components/navbar-bootstrap.js';
import DateComponent from '../components/date-component.js';
import fetches from '../functions/fetch.js';
// import imageFactory from '../functions/imgSrc.js';
import bgImage from '../functions/bgImage'

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
            console.log("activity success");
            console.log(activity);
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

        const {imageName, title, description, location, cost} = activity

        return (<div style={bgImage}>
            <div className='datePageTest'>
                {this.isUserLoggedIn()}

                <DateComponent
                    image={imageName}
                    title={title}
                    description={description}
                    location={location}
                    cost={cost}/>
            </div>

        </div>);
    }
}

export default DatePage
