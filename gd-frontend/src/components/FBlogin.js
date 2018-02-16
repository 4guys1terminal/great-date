import React, {Component} from 'react';
import FacebookAuth from 'react-facebook-auth';

const authenticate = (response) => {
  console.log(response);
  localStorage.setItem('name', response.email)
  // Api call to server so we can validate the token
};
const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>
    Login with facebook
  </button>
);


class FBlogin extends Component {
  render(){
    return(
    <div>
      <h1>Facebook Auth</h1>
      <FacebookAuth
        appId="1761739337205998"
        callback={authenticate}
        component={MyFacebookButton}
        redirectUri='/aosijdfioajfoe'
      />
    </div>
    )
  }
}

export default FBlogin
