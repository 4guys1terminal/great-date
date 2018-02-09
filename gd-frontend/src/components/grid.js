import React, { Component } from 'react';
import '../App.css';
import DatePreview from './date-preview';
import ActivitiesList from '../store/ActivitiesList.js';
import {Link} from 'react-router-dom';

class Grid extends Component {
    componentWillMount(){
        this.setState({activities: ActivitiesList})
    }

    render() {
        let list = this.state.activities.map(function(activity){
            return(
                < DatePreview
                id={activity.id}
                image={activity.image}
                title={activity.title}
                />
            )
        })

        return (
            <div className="container">
                <div className="grid">
                    {list}
                </div>
            </div>
        );
    }
}

export default Grid;
