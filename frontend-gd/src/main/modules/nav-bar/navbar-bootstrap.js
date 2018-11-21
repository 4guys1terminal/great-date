// React Imports
import React, {Component} from 'react';
// Globals
// Modules && General Components
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
// Component Specfic Imports
// Styles
import '../../App.scss';
// Documentation/Notes

class NavBarBootstrap extends Component {
    render() {
        return (
            <div>
                <Navbar   className='bootStrapNav'>
                    <Navbar.Header>

                        <LinkContainer to='/home'>
                            <Navbar.Brand id="logo">
                                Great Date
                            </Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle/>
                        
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to='/home' >
                                <NavItem>
                                    Home
                                </NavItem>
                            </LinkContainer>

                            <LinkContainer to='/date-generator'>
                                <NavItem>
                                    Date Generator
                                </NavItem>
                            </LinkContainer>

                            <LinkContainer to='/browse-dates'>
                                <NavItem>
                                    Browse Dates
                                </NavItem>
                            </LinkContainer>

                            <LinkContainer to='/login-page'>
                                <NavItem>
                                    Log In / Sign Up
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBarBootstrap;
