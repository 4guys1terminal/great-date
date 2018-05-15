import React, { Component } from 'react';
import Tables from '../components/tables.js'

import fetches from '../functions/fetch.js'

const {fetchTags, fetchActivities} = fetches

const API = process.env.NODE_ENV === 'production'
    ? 'https://the-great-date-app.herokuapp.com'
    : 'http://localhost:3000'

const style = {
    color: 'rgb(6, 144, 185)',
  }

export default class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentWillMount() {
    fetchActivities().then((res) => {
        const {activities} = res

        if (!activities) {
            return
        }

        this.setState({activities: activities})
    }).catch(e => console.log(e))
  }



  render() {
    const { activities } = this.state

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
      <div>
        <Tables activities={this.state.activities}/>
      </div>
    );
  }

}
