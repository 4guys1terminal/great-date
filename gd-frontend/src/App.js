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

        // this.goBack = this.goBack.bind(this);

    }

handleNewUser(params){
    fetch(`${API}/users`,
{
    body: JSON.stringify(params),
    headers: {
    'Content-Type': 'application/json'
},
    method: "POST"

}).then((rawResponse) => {
    return rawResponse.json();
    // console.log(rawResponse);
}).then((parsedResponse) => {

    if (parsedResponse.errors) {
        this.setState({ errors: parsedResponse.errors });
    } else {
        const users = Object.assign([], this.state.users);
        users.push(parsedResponse.user);
        this.setState({
            users: users,
            errors: null,
            newUserSuccess: true
        });
    }
});
}

componentWillMount() {
    fetch(`${API}/users`)
        .then((rawResponse) => {
            return rawResponse.json();
            console.log(rawResponse);
        })
        .then((parsedResponse) => {
            this.setState({ users: parsedResponse.users });
        });
}

componentDidMount() {
    console.log(this.state.users);
}

// <Route path='/sign-up-page' 
//     component={SignUpPage}
//     onSubmit={this.handleNewUser.bind(this)}/>
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

                <Route exact path="/sign-up-page" 
                    render={props => (
                        <div>
                        <SignUpPage
                            onSubmit={this.handleNewUser.bind(this)}
                            errors={this.state.errors && this.state.errors.validations}
                        />
                        {this.state.newUserSuccess &&
                            <Redirect to="/login" />
                        }
                        </div>
                )} />
            </Switch>
        </HashRouter>
    );
}
}

export default App;
