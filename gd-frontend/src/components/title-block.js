import React, {Component} from 'react';
import '../App.css';
import Title from './title.js';
import DateGenerator from './date-generator.js';
import api from '../functions/fetch.js';
import {Redirect} from 'react-router-dom';

const API = "http://localhost:3000"
const {fetchActivity} = api(API)

class TitleBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showComponent: false,
        }
    }

    handleClick = () => this.setState({
        showComponent: !this.state.showComponent
    })

    render() {
        return (
            this.state && this.state.showComponent
            ? <DateGenerator onSubmit={handleDateGenerator}/>
            : <Title onClick={this.handleClick.bind(this)}/>
        )
    }
}

export default TitleBlock;

function handleDateGenerator(params) {
    return fetch(`${API}/`, {
        method: "POST", //specifying our correct endpoint in the server
        headers: { //specifying that we're sending JSON, and want JSON back
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then((resp) => { //stringifying json for the fetch
        return resp.json()
    })
}
