import React, { Component } from 'react';
import '../App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    Row,
    HelpBlock,
    Alert,
    Checkbox
} from 'react-bootstrap';
import NavBar from '../components/navbar.js';

class TagCheckBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      tag: []
    }
  }


  createTagCheckbox = (tag) => {
      return (
          <Checkbox
              inline
              type="checkbox"
              key={tag.id}
              name={tag.title}
              value={tag.id}
              onChange={this.toggleCheckbox.bind(this, tag.id)}>
                  {tag.title}
          </Checkbox>
      )
  }


  createTagCheckboxes = () => {
      return this.state.tagExamples.map((tag) => {
          return this.createTagCheckbox(tag)
      })
  }


  toggleCheckbox = (tagID, e) => {
      const { form } = this.state
      const { tags } = form

      tags[tagID] = e.target.checked

      form.tags = tags

      this.setState({
          form: form
      })
  }


  render() {
    return (
      <div>
      <Row>
          <Col xs={10} xsOffset={1}>
          <FormGroup
              id = "tags-form-group"
              <ControlLabel id="tag">Tags</ControlLabel>
              <br/>

              {this.createTagCheckboxes()}

              {/*}
              {this.errorsFor('tags') &&
              <HelpBlock id="tags-help-block">{this.errorFor('tags')}</HelpBlock>
              }
              */}

          </FormGroup>
          </Col>
      </Row>
      </div>
    )
  }
}
  export default TagCheckBox
