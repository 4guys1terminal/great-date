import React, {Component} from 'react';
import '../App.css';
import DatePreview from './date-preview';
import ActivitiesList from '../store/ActivitiesList.js';
import {Link} from 'react-router-dom';

class Grid extends Component {
    componentWillMount() {
        this.setState({activities: ActivitiesList})
    }

    // makeGrid() {
    //     let i = 0;
    //     while (i < this.props.gridLimit) {
    //         this.state.activities.map(function(activity) {
    //             return (<DatePreview key={activity.id} id={activity.id} image={activity.image} title={activity.title} description={activity.description}/>)
    //         })
    //         i++
    //     }
    // }

    render() {
        let list = this.state.activities.map(function(activity) {
            return (<DatePreview key={activity.id} id={activity.id} image={activity.image} title={activity.title} description={activity.description}/>)
        })

        return (<div className="container">
            <div className="grid">
                {list}
            </div>
        </div>);
    }
}

export default Grid;
