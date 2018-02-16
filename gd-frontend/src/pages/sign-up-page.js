import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/navbar.js';
import SignUp from '../components/sign-up.js';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import bgImage from '../functions/bgImage'

const API = "http://127.0.0.1:3000";

var backgroundTexture = {
    backgroundImage: 'url(/images/grid_noise.png)'
};


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            errors: null,
            newUserSuccess: false,
            email: ''
        };
    }

handleNewUser(params) {
    fetch(`${API}/users`,
    {
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }
    ).then((rawResponse) => {
        return rawResponse.json();
    }).then((parsedResponse) => {
    if (parsedResponse.errors) {
        this.setState({ errors: parsedResponse.errors });
    } else {
        const users = Object.assign([], this.state.users);
        users.push(parsedResponse.user);
        this.setState({
            users: users,
            errors: null,
            newUserSuccess: true,
            email: parsedResponse.user.email
        });
    }
    });
}

    componentWillMount() {
        fetch(`${API}/users`)
            .then((rawResponse) => {
                return rawResponse.json();
            })
            .then((parsedResponse) => {
                this.setState({ users: parsedResponse.users });
            });
    }

    render() {
        return (
            <div style="bgImage">
                <NavBar />
                <SignUp onSubmit = { this.handleNewUser.bind(this) } />
                    {this.state.newUserSuccess ? <Redirect to={"/"} /> : null}
                    {this.state.newUserSuccess ? localStorage.setItem('name', this.state.email) : null}
            </div>
        );
    }
}

export default SignUpPage;
