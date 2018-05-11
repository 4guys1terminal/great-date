import React, {Component} from 'react';
import '../App.css';
import '../styles/admin-login.css';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import bgImage from '../functions/bgImage.js'

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change);
  }


  render() {
    return (
      <div style={bgImage} className="admin-login-page">
        <div className="admin-login-form">
          <h2>Admin Login</h2>
          <input type="text" placeholder="Username" name="username" onChange={this.onChange}></input>
          <br/>
          <input type="text" placeholder="Password" name="password" onChange={this.onChange}></input>
          <br/>
          <input type="submit"></input>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
