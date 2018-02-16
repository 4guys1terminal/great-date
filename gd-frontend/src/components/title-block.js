import React, {Component} from 'react';
import '../App.css';
import Title from './title.js';
import DateGenerator from './date-generator.js';

class TitleBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showComponent: false
        }
    }

    handleClick = () => this.setState({
        showComponent: !this.state.showComponent
    })

    // handleShuffle = () =>

    render() {
        return (
            this.state && this.state.showComponent
            // ? <DateGenerator onClick={this.handleShuffle.bind(this)}/>
            ? <DateGenerator />
            : <Title onClick={this.handleClick.bind(this)}/>);
    }
}

export default TitleBlock;
