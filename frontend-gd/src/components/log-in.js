import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import FBlogin from '../components/fb-login';
import GoogleLog from './google-login';
import {
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';



const API = process.env.NODE_ENV === 'production' ? 'https://the-great-date-app.herokuapp.com' : 'http://localhost:3000'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                email: '',
                password: '',
            },
            errors: null,
            authorized: false,
            valid: true,
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

        fetch(`${API}/api/sessions/new` ,
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
            } else {
                this.setState({valid: false})
            }
        }).catch( (e) => console.log("error:", e))
    }

    handleChange = (e) => {
        const { form } = this.state
        form[e.target.name] = e.target.value.trim() // trims white space (spacebar)
        // console.log(e.target.value)  un-comment to understand .trim
        this.setState({ form: form })
    }




    render() {
        const { authorized, form } = this.state
        const login =
        (<div className="login-wrapper">
            <form className="login-form" onSubmit={this.authorize} onChange={this.handleChange.bind(this)}>

                <div className="login-title">Great Date</div>
                <div className="alert-holder">
                    <span className="center">
                        {!this.state.valid && <div className="alert alert-danger">Invalid username or password. Please try again</div>}
                    </span>
                </div>
                <Row className="row">
                    <Col xs={10}>
                        <FormGroup id="email-form-group">
                            <ControlLabel id="email"></ControlLabel>
                            <FormControl placeholder="Email" type="text" name="email" value={this.state.form.email} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="row">
                    <Col xs={10}>
                        <FormGroup id="password-form-group">
                            <ControlLabel id="password"></ControlLabel>
                            <FormControl placeholder="Password" type="password" name="password" value={this.state.form.password} onChange={this.handleChange.bind(this)}/>
                        </FormGroup>
                    </Col>
                </Row>

                <button className="login-btn" type="submit">
                    Log in
                </button>
                <GoogleLog />

                <FBlogin />

                {/* <a className="forgot" href="#">
                    <p>Forgot password?</p>
                    </a> */
                }
            </form>



            <div className="sign-up">
                <p className="sign-up-text">
                    Dont have an account?
                    <Link to='/sign-up-page' id='sign-up-link' className='sign-up-link'>
                        <span> Sign Up</span></Link>
                </p>

            </div>
        </div>)
        return(
            <div>
                <div id="authorization">
                    {
                        authorized
                            ? <Redirect to={"/"}/>
                            : login
                    }
                    {
                        authorized
                            ? localStorage.setItem('name', this.state.form.email)
                            : null
                    }

                </div>
            </div>
        );
    }
}

export default Login;
