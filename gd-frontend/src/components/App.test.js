import React, {Component} from 'react';
import FacebookAuth from 'react-facebook-auth';

const authenticate = (response) => {
  console.log(response);
  // Api call to server so we can validate the token
};
const MyFacebookButton = ({ onClick }) => (
  <button onClick={onClick}>
    Login with facebook
  </button>
);

const App = () => (
  <div>
    <h1>Facebook Auth</h1>
    <FacebookAuth
      appId="1761739337205998"
      callback={authenticate}
      component={MyFacebookButton}
      redirectUri='/aosijdfioajfoe'
    />
  </div>
);

class FBlogin extends Component {

}
