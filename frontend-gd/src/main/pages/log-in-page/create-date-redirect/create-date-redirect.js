import React from 'react';
import { Link } from 'react-router-dom';
import NavbarBootstrap from '../../../modules/nav-bar/navbar-bootstrap';

// import '../../../../App.cscss';
import './create-date-redirect.scss';

// TODO: this will be a part of the auth flow
const CreateDateRedirect = props => {
	return (
		<div style={style2}>

			<NavbarBootstrap />


			<h2 style={style}> Whoops! You have to be signed in to do that. </h2>

		<Link to='/login-page'>
			<button className='success-btn'><span>Log In/Sign Up</span></button>
		</Link>

		</div>
	);
}

export default CreateDateRedirect;

// TODO: export this to style sheet
const style = {
    color: 'white',
    marginTop: '25vh',
}

const style2 = {
        backgroundImage: 'linear-gradient(to bottom, rgb(13,194,181) 0%, rgb(6, 144, 185) 100%)',
        backgroundSize: 'cover',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        height: '100vh',
}
