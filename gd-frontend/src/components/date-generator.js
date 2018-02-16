import React, { Component } from 'react';
import '../App.css';
import {
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    ButtonGroup,
    Row,
    HelpBlock,
    Alert,
    Radio,
    Checkbox
} from 'react-bootstrap';

const API = "http://localhost:3000"

class DateGenerator extends Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        tags: {}
      },
      tags: []
    }
  }

  componentWillMount(){
    fetch(`${API}/tags`)
    .then((resp) => {
      return resp.json()
    })
    .then((resp) => { this.setState({tags: resp.tags}) })
  }

  handleChange(e) {
      const { form } = this.state

      form[e.target.name] = e.target.value

      this.setState({
          form: form
      })
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
      return this.state.tags.map((tag) => {
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

  handleSubmit() {
      console.log('test2',this.state.form);
      this.props.onSubmit(this.state.form);
  }

    render() {
        return (
          <div className='date-generator'>
                <h1>
                    Date Generator
                </h1>

                <Button
                bsSize="large"
                id="submit"
                onClick={this.handleSubmit.bind(this)}
                >Shuffle</Button>
                <br/>
                <br/>
                <div className="createDateDiv">
                    <form className="createDateForm">
                    <Row>
                        <Col xs={10} xsOffset={1}>
                        <FormGroup
                            id = "tags-form-group">
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
                    </form>
                </div>


          <Button onClick={this.props.onClick} className='date-btn' bsSize="large">Shuffle</Button>
      </div>);

    }
}

export default DateGenerator;
