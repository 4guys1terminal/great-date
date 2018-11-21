// React Imports
import React, { Component } from 'react';
// Globals
// Modules && General Components
// Component Specfic Imports
import DatePreview from './date-preview';
import imageFactory from '../../tools/imgSrc.js';
// Styles
import '../../App.scss';
// Documentation/Notes


const host = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'

// for development image processing, not used in production
const path = "/api/user-uploads/"
const imgSrc = imageFactory(host)

class Grid extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { activities } = this.props

        if(!activities) {
            return (
                <div className="container">
                    <div className="grid">
                        <h1 style={style}>Loading...</h1>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="grid">
                    {activities.map((activiy) => {
                        return (
                            <DatePreview
                                key={activiy.id}
                                id={activiy.id}
                                image={activiy.imageName}
                                title={activiy.title}
                                description={activiy.description}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Grid;


const style = {
    color: 'rgb(6, 144, 185)',
}
