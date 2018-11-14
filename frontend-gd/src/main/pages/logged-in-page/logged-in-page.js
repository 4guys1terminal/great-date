import React, { Component } from 'react';
import variables from '../../tools/variables';
import LoggedInNav from '../../components/logged-in-navbar';
import '../../../App.scss';


class LoggedIn extends Component {

    render() {
        return (
            <div style={variables.backgroundStyle}>
                <LoggedInNav />

            </div>
        );
    }
}

export default LoggedIn;
