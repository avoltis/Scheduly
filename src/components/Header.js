import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import logo from '../images/clock.png'

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Scheduly
                <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <div className="right menu" style={{ paddingBottom: 10 }}>
                <Link to="/" className="item">
                    All Schedules
                </Link>
                <div style={{ paddingTop: 10 }}>
                    <GoogleAuth />
                </div>
            </div>
        </div>
    );
};

export default Header;