import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import Home from './pages/home';
import LogInPage from './pages/log-in-page';
import SignUpPage from './pages/sign-up-page';
import LoggedInPage from './pages/logged-in-page';
import AllDatesPage from './pages/all-dates-page';
import DatePage from './pages/date-page';
import NewActivityPage from './pages/new-activity-page';
import NewActivitySuccess from './pages/new-activity-success';
import DateGeneratorPage from './pages/date-generator-page';
import CreateDateRedirect from './pages/create-date-redirect'

import ScrollToTop from './functions/scrollToTop.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUserSuccess: false,
            errors: null,
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
                    <Route path='/admin-login' />
                    <Route path='/admin-dash' />
                </ScrollToTop>
            </Switch>
        </Router>);
    }
}

export default App;
