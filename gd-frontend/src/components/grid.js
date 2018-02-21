import React, {Component} from 'react';
import '../App.css';
import DatePreview from './date-preview';
import {Link} from 'react-router-dom';
import imageFactory from '../functions/imgSrc.js';
import api from '../functions/fetch.js';

const host = process.env.NODE_ENV === 'production' ? "/" : "http://localhost:3000/"

const { fetchTags, fetchActivities } = api(host)
const path = "/user-uploads/"
const imgSrc = imageFactory(host, path)


class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        fetchTags()
        .then(res => {
            this.setState({
                tags: res.tags
            })
        })

        fetchActivities()
        .then(res => {
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
