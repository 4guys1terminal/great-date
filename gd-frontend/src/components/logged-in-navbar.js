import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


class Navigation extends Component {
    signOut() {
        localStorage.removeItem("name");
    }

    render() {
        return (<div>
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
                            <NavItem eventKey={1} active='false'>
                                Home
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/all-dates-page'>
                            <NavItem eventKey={2} active='false'>
                                Browse Dates
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/home'>
                            <NavItem active='false'>
                                {localStorage.name}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/login-page'
                            onClick={this.signOut}>
                            <NavItem eventKey={3} active='false'>
                                Sign Out
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>);
    }
}

export default Navigation;
