import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top.js';

import Home from './pages/home.js';
import LogInPage from './pages/log-in-page.js';
import SignUpPage from './pages/sign-up-page.js';
import AllDatesPage from './pages/all-dates-page.js';
import DatePage from './pages/date-page.js';
import NewDatePage from './pages/new-activity-page.js';
import NewActivitySuccess from './pages/new-activity-success.js';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <ScrollToTop>

                    <Route exact path='/' component={Home}/>
                    <Route path='/activities/:id' component={DatePage}/>
                    <Route path='/login-page' component={LogInPage}/>
                    <Route path='/sign-up-page' component={SignUpPage}/>
                    <Route path='/all-dates-page' component={AllDatesPage}/>
                    <Route path='/new-activity' component={NewDatePage}/>
                    <Route path='/success' component={NewActivitySuccess}/>

                    </ScrollToTop>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
