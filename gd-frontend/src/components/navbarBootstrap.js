import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

class Navigation extends Component {
    render() {
        return (<div>
            <Navbar staticTop className='bootStrapNav'>

                <Navbar.Header>
                    <LinkContainer to='/' id='home-nav' className='nav-btn1'>
                        <Navbar.Brand componentclass="bsNavLeft">

                            Great Date
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse componentclass="bsNavRight">
                    <Nav pullRight>
                        <LinkContainer to='/' className='nav-btn2' id='all-dates-nav'>
                            <NavItem eventKey={1}>
                                Home
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/all-dates-page' id='all-dates-nav' className='nav-btn2'>
                            <NavItem eventKey={2}>
                                Browse Dates
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/login-page' className='nav-btn2' id='login-link'>
                            <NavItem eventKey={3}>
                                Log In / Sign Up
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>);
    }
}

export default Navigation;
