import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const API = "http://127.0.0.1:3000";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                email: '',
                password: ''
            },
            errors: null,
            authorized: false
        };
    }

    /**
    authorize will fire on form submit. State will be set to
    the form values email and password and it will find a user
    WHERE email === form email and encrypt the password(backend), and check if
    it matches. If it does, set auth state === true.
    */
    authorize = (e) => {
        e.preventDefault()
        const { email, password } = this.state.form

        fetch(`${API}/sessions/new` ,
        {
            method: "post",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((resp) => resp.json())
        .then((data) => {
            console.log("resp:", data);
            if (data.message === "login success") {
                this.setState({ authorized: true })
            }
        }).catch( (e) => console.log("error:", e))
    }

    handleChange = (e) => {
        const { form } = this.state
        form[e.target.name] = e.target.value.trim() // trims white space (spacebar)
        // console.log(e.target.value) // un-comment to understand .trim
        this.setState({
            form: form
        })
    }
    render() {
        const { authorized, form } = this.state
        const { email, password } = form
        const login = (<div className="login-wrapper">
            <form
                className="login-form"
                onSubmit={this.authorize}
                onChange={this.handleChange.bind(this)}>
                <div
                    className="login-title">Great Date</div>
                <input
                    className="lname"
                    name="email"
                    type="text"
                    placeholder="Email"
                />
                <input
                    className="lname"
                    name="password"
                    placeholder="Password"
                    type="password"
                />

                <button
                    className="login-btn"
                    type="submit">
                    Log in
                </button>
                <a className="forgot" href="#">
                    <p>Forgot password?</p>
                </a>
            </form>
            <div className="sign-up">
                <p
                    className="sign-up-text"> Dont have an account? <Link
                    to='/sign-up-page'
                    id='sign-up-link'
                    className='sign-up-link'
                >Sign Up</Link></p>
            </div>
        </div>
        )

        return (
            <div>
                <div id="authorization">
                    {authorized ? <Redirect to={"/logged-in-page"} /> : login}
                    {authorized ? localStorage.setItem('name', this.state.form.email) : null}
                </div>
            </div>
        );
    }
}

export default Login;
