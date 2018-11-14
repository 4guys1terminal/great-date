import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';


import Home from './main/pages/home';

import LogInPage from './main/pages/log-in-page/log-in-page';
import SignUpPage from './main/pages/sign-up-page/sign-up-page';
import LoggedInPage from './main/pages/logged-in-page/logged-in-page';
import BrowseDatesPage from './main/pages/browse-dates-page/browse-dates-page';
import DatePage from './main/pages/date-page';
import NewDatePage from './main/pages/new-date-page/new-date-page';
import NewDateSuccess from './main/pages/new-date-success/new-date-success';
import DateGeneratorPage from './main/pages/date-generator/date-generator';
import CreateDateRedirect from './main/pages/create-date-redirect/create-date-redirect';
import AdminLoginPage from './main/pages/admin-login';
import AdminDash from './main/pages/admin-dash'

import ScrollToTop from './main/tools/scrollToTop.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			newUserSuccess: false,
			errors: null
		};
	}

	render() {
		return (
			<Router>
				<Switch>
					<ScrollToTop>
					<Route exact path='/' component={Home}/>
					<Route path='/home' component={Home}/>

					<Route path='/activities/:id' component={DatePage}/>

					<Route path='/login-page' component={LogInPage}/>

					<Route path='/browse-dates' component={BrowseDatesPage}/>

					<Route path='/new-date' component={NewDatePage}/>

					<Route path='/success' component={NewDateSuccess}/>

					<Route path='/logged-in-page' component={LoggedInPage}/>

					<Route exact path="/sign-up-page" render={props => (
						<div>
							<SignUpPage errors={this.state.errors && this.state.errors.validations}/>
						</div>
					)}/>

					<Route path='/date-generator' component={DateGeneratorPage}/>

					<Route path='/create-date-redirect' component={CreateDateRedirect}/>

					<Route path='/admin-login' component={AdminLoginPage}/>
					<Route path='/admin-dash' component={AdminDash}/>
					</ScrollToTop>
				</Switch>
			</Router>
		);
	}
}

export default App;
