import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './views/home/home';
import LogInPage from './views/log-in-page/log-in-page';
import SignUpPage from './views/sign-up-page/sign-up-page';
import LoggedInPage from './views/logged-in-page/logged-in-page';
import AllDatesPage from './views/all-dates-page/all-dates-page';
import DatePage from './views/date-page';
import NewActivityPage from './views/new-activity-page/new-activity-page';
import NewActivitySuccess from './views/new-activity-success/new-activity-success';
import DateGeneratorPage from './views/date-generator-page/date-generator-page';
import CreateDateRedirect from './views/create-date-redirect/create-date-redirect';
import AdminLoginPage from './views/admin-login';
import AdminDash from './views/admin-dash'

import ScrollToTop from './functions/scrollToTop.js';

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
    return (<Router>
      <Switch>
        <ScrollToTop>

          <Route exact path='/' component={Home}/>
          <Route path='/home' component={Home}/>
          <Route path='/activities/:id' component={DatePage}/>
          <Route path='/login-page' component={LogInPage}/>
          <Route path='/all-dates-page' component={AllDatesPage}/>
          <Route path='/new-activity' component={NewActivityPage}/>
          <Route path='/success' component={NewActivitySuccess}/>
          <Route path='/logged-in-page' component={LoggedInPage}/>
          <Route exact path="/sign-up-page" render={props => (<div>
              <SignUpPage errors={this.state.errors && this.state.errors.validations}/>
            </div>)}/>
          <Route path='/date-generator-page' component={DateGeneratorPage}/>
          <Route path='/create-date-redirect' component={CreateDateRedirect}/>

          {/* TODO: create components for the login and dashboard */}
          <Route path='/admin-login' component={AdminLoginPage}/>
          <Route path='/admin-dash' component={AdminDash}/>



        </ScrollToTop>
      </Switch>
    </Router>);
  }
}

export default App;
