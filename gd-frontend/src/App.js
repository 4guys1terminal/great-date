import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import AllDatesPage from './pages/all-dates-page.js';
import DatePage from './pages/date-page.js';
import NewActivity from './pages/new-activity.js';
import Home from './pages/home.js';
import LogInPage from './pages/log-in-page.js';
import SignUpPage from './pages/sign-up-page.js';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/activities/:id' component={DatePage}/>
                    <Route path='/login-page' component={LogInPage}/>
                    <Route path='/sign-up-page' component={SignUpPage}/>
                    <Route path='/all-dates-page' component={AllDatesPage}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
