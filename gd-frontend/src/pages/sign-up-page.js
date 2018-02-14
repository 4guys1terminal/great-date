import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/navbar.js';
import SignUp from '../components/sign-up.js';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const API = "http://127.0.0.1:3000";

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            errors: null,
            newUserSuccess: false
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
        console.log(parsedResponse.errors);
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
            })
            .then((parsedResponse) => {
                this.setState({ users: parsedResponse.users });
            });
    }

    render() {
        return (
            <div>
<<<<<<< HEAD
                <NavBar />
                <SignUp onSubmit = { this.handleNewUser.bind(this) } />
                    {this.state.newUserSuccess ? <Redirect to={"/logged-in-page"} /> : null}
                    {this.state.newUserSuccess ? localStorage.setItem('name', this.state.form.email) : null}
=======
                < NavBar />
                    <div className="signup-page">
                        < SignUp />
                    </div>
>>>>>>> master
            </div>
        );
    }
}

export default SignUpPage;
