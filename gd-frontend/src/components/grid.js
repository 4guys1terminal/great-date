import React, {Component} from 'react';
import '../App.css';
import DatePreview from './date-preview';
import {Link} from 'react-router-dom';

const host = "http://localhost:3000"
const path = "/user-uploads/"

class Grid extends Component {
    componentWillMount() {
        fetch(`${host}/activities`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({activities: resp.activities})
            console.log(this.state);
        })

        fetch(`${host}/tags`).then((resp) => {
            return resp.json()
        }).then((resp) => {
            this.setState({tags: resp.tags})
        })

    }

    // imageHost(host, path){
    //     return function(image) {
    //         return host+path+image
    //     }
    // }
    //

    // "http://localhost:3000" + "/user-uploads/" + "282535.jpg"

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
        // const imgSrc = imageHost(host,path);


        let list = this.state.activities.map(function(activity) {
            // let imageHERE = imgSrc(activity.imageName)
            return (
                <DatePreview key={activity.id} id={activity.id} image={activity.image} title={activity.title} description={activity.description}/>
            )
        })

        return (<div className="container">
            <div className="grid">
                {list}
            </div>
        </div>);
    }
}

export default Grid;
