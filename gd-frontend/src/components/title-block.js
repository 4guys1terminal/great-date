import React, {Component} from 'react';
import '../App.css';
import Title from './title.js';
import DateGenerator from './date-generator.js';

const API = "http://localhost:3000"

class TitleBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
          activities: [],
          tags: [],
          showComponent: false
        }
    }

    handleClick = () => this.setState({
        showComponent: !this.state.showComponent
    })

    handleDateGenerator(params) {
      fetch(`${API}/`, {
          method: "POST", //specifying our correct endpoint in the server
          headers: { //specifying that we're sending JSON, and want JSON back
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
      }).then((resp) => { //stringifying json for the fetch
          console.log('test',this.state.form);

          return resp.json()
      }).then((resp) => {
              const tags = Object.assign([], this.state.tags)
              tags.push(resp.tag)
              this.setState({
                  tags: tags,
              })
      })
  }


    render() {
        return (
            this.state && this.state.showComponent
            ? <DateGenerator onSubmit={this.handleDateGenerator.bind(this)}/>
            : <Title onClick={this.handleClick.bind(this)}/>);
    }
}

export default TitleBlock;
