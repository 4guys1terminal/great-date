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
import LoggedInPage from './pages/logged-in-page.js';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

const API = "http://localhost:3000";

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
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Home}/>

                <Route path='/activities/:id' 
                    component={DatePage}/>

                <Route path='/login-page' 
                    component={LogInPage}/>

                <Route path='/all-dates-page' 
                    component={AllDatesPage}/>

                <Route path='/logged-in-page'
                    component={LoggedInPage} />

                <Route exact path="/sign-up-page" 
                    render={props => (
                        <div>
                        <SignUpPage
                            errors={this.state.errors && this.state.errors.validations}
                        />
                        </div>
                )} />
            </Switch>
        </HashRouter>
    );
}
}

export default App;
