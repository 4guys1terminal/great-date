import React, {Component} from 'react';
import '../../../App.scss';
import DatePreview from './date-preview';
import imageFactory from '../../tools/imgSrc.js';

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
                    {activities.map((a) => {
                        return (
                            <DatePreview
                                key={a.id}
                                id={a.id}
                                image={a.imageName}
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


const style = {
    color: 'rgb(6, 144, 185)',
}
