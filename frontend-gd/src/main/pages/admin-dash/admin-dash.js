import React, { Component } from 'react';
import variables from '../../tools/variables';
import TableModule from '../../components/table-module/TableModule';
import './admin-dash.scss';

import { CardHeader } from 'reactstrap';
import fetches from '../../tools/fetch.js';

const { fetchAllActivities } = fetches;

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
    fetchAllActivities().then((res) => {
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
      <div className="admin-dash" style={variables.backgroundStyle}>

        <CardHeader>
          <h2 className="admin-dash-header">Great Date Submissions</h2>
        </CardHeader>

        <TableModule activities={this.state.activities}/>
      </div>
    );
  }

}
