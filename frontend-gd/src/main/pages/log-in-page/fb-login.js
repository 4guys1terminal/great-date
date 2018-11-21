import React, {Component} from 'react';
import FacebookAuth from 'react-facebook-auth';
import { Redirect } from 'react-router-dom';

const STYLE = {
marginLeft: 5
}

const MyFacebookButton = ({ onClick }) => (
	<button className='login-btn' id='FBlogin' onClick={onClick}>
		<i className="fab fa-facebook-square fa-2x" style={STYLE}></i> <span id="fb-text">Log in with Facebook </span>
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
/**
 * If there is a response, set the state to authorized and set
 * name to facebook name in local storage
 */
render(){
	const authenticate = (res) => {
		// console.log(res);
			if (res) {
			this.setState({ authorized: true, username: res.name })
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
			? localStorage.setItem('name', username)
			: null
	}
	</div>
	)
}
}

export default FBlogin
