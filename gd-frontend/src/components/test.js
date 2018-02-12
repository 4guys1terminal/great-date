import 'bootstrap/dist/css/bootstrap.css'

import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'

import RadioGroup from './RadioGroup'

export default class Example extends React.Component {
  state = {
    test: ''
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    return <Grid>
      <Col sm={12} style={{marginBottom: '1em'}}>
        <h1>&lt;RadioGroup/&gt;</h1>
        <RadioGroup
          name="test"
          onChange={this.handleChange}
          options={[
            ['dairy', 'Cheese'],
            ['fruit', 'Apple'],
            ['meat', 'Ham'],
          ]}
          value={this.state.test}
        />
      </Col>
      <Col sm={12}>
        <pre>{`<RadioGroup
  name="test"
  onChange={this.handleChange}
  options={[
    ['dairy', 'Cheese'],
    ['fruit', 'Apple'],
    ['meat', 'Ham'],
  ]}
  value={this.state.test}
/>`}</pre>
      </Col>
    </Grid>
  }
}
