import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        password: '',
        email: ''
      }
    };
  }


  handleChange(e) {
    const formState = Object.assign({}, this.state.form);
    formState[e.target.name] = e.target.value;
    this.setState({ form: formState });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { form } = this.state;
    if (onSubmit) {
      onSubmit(form);
    } else {
      // console.log("no onSubmit props passed");
    }
  }

  /**
  Component recieves a prop named error, if it isn't empty it
  */
  errorsFor(attribute) {
    var errorString = "";
    if (this.props.errors) {
      const errors = this.props.errors.filter(error => error.param === attribute);
      if (errors) {
        errorString = errors.map(error => error.msg).join(", ");
      }
    }
    return errorString === "" ? null : errorString;
  }

  render() {
    return (<div>
      <div className="signup-wrapper">
        <form className="signup-form" validationState={this.errorsFor('firstName') && 'error'}>
          <p className="signup-form-title">Great Date</p>
          <p className="signup-form-blurb">Sign up to see photos and
            <br/>
          videos from your friends.</p>
          <button className="use-fb">Log in with Facebook</button>
          <div className="center">
            <p className="or">
              <span className="hyphen1">_____________</span>OR<span className="hyphen1">_______________</span>
            </p>
          </div>

          <input className="lname" placeholder="First Name" name="firstName" type="text" value={this.state.form.firstName} onChange={this.handleChange.bind(this)}/>
          <input className="lname" placeholder="Last Name" type="text" name="lastName" value={this.state.form.lastName} onChange={this.handleChange.bind(this)}/>
          <input className="lname" placeholder="Email" name="email" type="email" value={this.state.form.email} onChange={this.handleChange.bind(this)}/>
          <input className="lname" placeholder="Password" name="password" type="password" value={this.state.form.password} onChange={this.handleChange.bind(this)}/> {/* {
              this.errorsFor('password') &&
              <div id="help-block">{this.errorsFor('password')}</div>
            } */
          }
          <button className="login-btn" onClick={this.handleSubmit.bind(this)}>
            Sign up {localStorage.setItem('name', 'this.state.form.email')}
          </button>
          <a className="forgot" href="#">
            <p className="agree">By signing up, you agree to our
              <br/>
              <span className="terms">Terms & Privacy Policy.</span>
            </p>
          </a>
        </form>

        <div className="login">
          <p className="login-text">Have an account?
            <Link to='/login-page' className='login-link' id='login-link'>
              Log In
            </Link>
          </p>
        </div>
      </div>

    </div>);
  }
}

export default SignUp;
