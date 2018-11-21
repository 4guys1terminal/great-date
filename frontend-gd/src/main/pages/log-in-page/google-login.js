import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';

const KEY = "525476460151-027bhu8spj34pr2gcm7o37vnd9r016ss.apps.googleusercontent.com"

const responseGoogle = (response) => {
  localStorage.setItem('name', response.profileObj.name)
  console.log('name', response.profileObj.name)
  console.log(response);
}

const MyGoogleButton = ({ onClick }) => (
  <button className='login-btn' id='google-login' onClick={onClick}>
     <i className="fab fa-google fa-2x" style={STYLE}></i> Log in with Google
  </button>
);

const STYLE = {
  marginLeft: 5
}

class GoogleLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			authorized: false
		}
	}
	render() {


    const { authorized, username } = this.state

    const authenticate = (res) => {
      // console.log(res);
          if (res) {
          this.setState({ authorized: true, username: res.profileObj.name })
        }
    };

    return(
      <div>
      <GoogleLogin
        clientId={KEY}
        buttonText="Login"
        onSuccess={authenticate}
        onFailure={responseGoogle}
        onClick={authenticate}
        tag={MyGoogleButton}
      />


      {
          authorized
              ? <Redirect to={"/"}/>
              : null
      }
      {
          authorized
              ? localStorage.setItem('name', username)
              : null
      }
      </div>
    )
  }
}


export default GoogleLogin
// document.getElementById('googleButton')
