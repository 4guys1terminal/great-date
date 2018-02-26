import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

import Home from './pages/home.js';
import LogInPage from './pages/log-in-page.js';
import SignUpPage from './pages/sign-up-page.js';
import LoggedInPage from './pages/logged-in-page.js';
import AllDatesPage from './pages/all-dates-page.js';
import DatePage from './pages/date-page.js';
import NewActivityPage from './pages/new-activity-page.js';
import NewActivitySuccess from './pages/new-activity-success.js';
import DateGeneratorPage from './pages/date-generator-page.js';

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
                    <Route path='/browse' />

                </ScrollToTop>
            </Switch>
        </Router>);
    }
}

export default App;
