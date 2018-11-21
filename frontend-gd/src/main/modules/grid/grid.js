import React, { Component } from 'react';
import DatePreview from '../date-preview/date-preview';
import '../../../App.scss';


class Grid extends Component {
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
