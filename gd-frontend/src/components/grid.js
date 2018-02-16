import React, {Component} from 'react';
import '../App.css';
import DatePreview from './date-preview';
import {Link} from 'react-router-dom';
import imageFactory from './imgSrc.js';
// import { fetchTags, fetchActivities } from './fetch.js';


const host = "http://localhost:3000"
const path = "/user-uploads/"

const imgSrc = imageFactory(host, path)


class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        fetchTags()
        .then((res) => {
            this.setState({
                tags: res.tags
            })
        })

        fetchActivities()
        .then((res) => {
            this.setState({
                activities: res.activities
            })
        })
    }

    render() {
        const { activities } = this.state

        if(!activities) {
            return (
                <div className="container">
                    <div className="grid">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="grid">
                    {activities.map((a) => {
                        return (
                            <DatePreview
                                key={a.id}
                                id={a.id}
                                image={imgSrc(a.imageName)}
                                title={a.title}
                                description={a.description}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Grid;


function fetchTags() {
    return fetch(`${host}/tags`).then((res) => {
        return res.json()
    })
}

function fetchActivities() {
    return fetch(`${host}/activities`).then((res) => {
        return res.json()
    })
}
