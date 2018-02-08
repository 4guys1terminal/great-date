import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch} from 'react-router-dom';
import AllDatesPage from './pages/all-dates-page.js';
import DatePage from './components/date-page.js';
import NewActivity from './pages/new-activity.js';
import Home from './Home.js';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path="/activities/:id" component={DatePage}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
