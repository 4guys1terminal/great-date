import React, {Component} from 'react';
import FacebookAuth from 'react-facebook-auth';
import {BrowserRouter as Router, Route, Redirect,} from 'react-router-dom';
import {
    Button
} from 'react-bootstrap';

const MyFacebookButton = ({ onClick }) => (
  <button className='login-btn' id='FBlogin' onClick={onClick}>
    Login with facebook
  </button>
);

class FBlogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            authorized: false
        }
    }

  render(){
      const authenticate = (response) => {
        // console.log(response);
            if (response) {
            this.setState({ authorized: true, username: response.name })
          }
      };
      const { authorized, username } = this.state
      // const check = username.length
      // console.log('authorized?', check)

    return(
    <div>
      <FacebookAuth
        appId="1761739337205998"
        callback={authenticate}
        component={MyFacebookButton}
      />
      {
          authorized
              ? <Redirect to={"/"}/>
              : null
      }
      {
          authorized
              ? localStorage.setItem('name', this.state.username)
              : null
      }
    </div>
    )
  }
}

export default FBlogin
