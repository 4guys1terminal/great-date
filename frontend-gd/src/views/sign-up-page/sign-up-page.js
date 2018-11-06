import React, { Component } from 'react';
import '../../App.css';
import SignUp from '../../components/sign-up';
import { Redirect } from 'react-router-dom';
import bgImage from '../../functions/bgImage'
import NavbarBootstrap from '../../components/navbar-bootstrap'

const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            errors: [],
            newUserSuccess: false,
            email: ''
        };
    }

    componentWillMount() {
        fetch(`${API}/api/users`)
            .then((raw) => {
                return raw.json();
            })
            .then((res) => {
                this.setState({ users: res.users });
            })
            .catch(e => console.log(e))
    }

    handleNewUser(params) {
        fetch(`${API}/api/users`, {
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
        .then(raw => raw.json())
        .then((res) => {
            if (res.errors) {
                this.setState({
                    errors: res.errors
                })
                console.log("errors", this.state.errors.validations)
            } else {
                const { users } = this.state

                users.push(res.user)

                this.setState({
                    users: users,
                    errors: ["this has been reset"],
                    newUserSuccess: true,
                    email: res.user.email
                })
            }
        })
        .catch(e => console.log(e))
    }

    render() {
        return (
            <div style={bgImage}>
                <NavbarBootstrap />
                <SignUp
                    onSubmit={this.handleNewUser.bind(this)}
                    errors={this.state.errors}
                />
                    {this.state.newUserSuccess ? <Redirect to={"/"} /> : null}
                    {this.state.newUserSuccess ? localStorage.setItem('name', this.state.email) : null}
            </div>
        );
    }
}

export default SignUpPage;