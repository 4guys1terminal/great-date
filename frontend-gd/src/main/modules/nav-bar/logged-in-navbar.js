import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import '../../../App.scss';


class Navigation extends Component {
    signOut() {
        localStorage.removeItem("name");
    }

    render() {
        return (<div>
            <Navbar className='bootStrapNav'>

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
                            <NavItem eventKey={1} >
                                Home
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/date-generator'>
                            <NavItem>
                                Date Generator
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/browse-dates'>
                            <NavItem eventKey={2} >
                                Browse Dates
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/new-activity'>
                            <NavItem >
								Create A Date
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to='/login-page'
                            onClick={this.signOut}>
                            <NavItem eventKey={3} >
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
