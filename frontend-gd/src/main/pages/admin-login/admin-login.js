import React, {Component} from 'react';

import variables from '../../tools/variables';

import '../../../App.scss';
import './admin-login.scss';


class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change);
  }

  render() {
    return (
      <div style={variables.backgroundStyle} className="admin-login-page">
        <div className="admin-login-form">
          <h2>Admin Login</h2>
          <input type="text" placeholder="Username" name="username" onChange={this.onChange}></input>
          <br/>
          <input type="text" placeholder="Password" name="password" onChange={this.onChange}></input>
          <br/>
          <button className="admin-login-btn">
              <span>
              Log In
              </span>
          </button>
        </div>

      </div>
    );
  }
}

export default AdminLogin;
