import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Navigation extends Component {
    render() {
        return (<div>
            <Navbar staticTop className='bootStrapNav'>

                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/' id='home-nav' className='nav-btn1'>Great Date</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1}>
                            <Link to='/' id='home-nav' className='nav-btn1'>Home</Link>
                        </NavItem>

                        <NavItem eventKey={2}>
                            <Link to='/all-dates-page' id='all-dates-nav' className='nav-btn1'>Browse Dates</Link>
                        </NavItem>

                        <NavItem eventKey={3}>
                            <Link to='/login-page' className='nav-btn2' id='login-link'>
                                Log In / Sign Up</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* <nav className="navbar">
                <div className="logo">
                    <Link to='/' id='home-nav' className='nav-btn1'>[Logo] Great Date</Link>
                </div>

                <div className="nav-buttons">
                    <Link to='/' id='home-nav' className='nav-btn1'>Home</Link>

                    <Link to='/all-dates-page' id='all-dates-nav' className='nav-btn1'>Browse Dates</Link>

                    <Link to='/login-page' className='nav-btn2' id='login-link'>
                        Log In / Sign Up</Link>
                </div>
            </nav> */
            }
        </div>);
    }
}

export default Navigation;
