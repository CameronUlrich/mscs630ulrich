import React, { Component } from 'react';
//import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'; // need to install reactstrap on server
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import './styles/Header.css';

/*
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser, faUsers, faUserFriends, faCog, faUserShield, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add( faUser, faUsers, faUserFriends, faCog, faUserShield, faHome, faSignOutAlt )


*/





class Header extends Component {
    render() {
        return(
            <div>
                <div className="topnav">
                    <ul>
                        <Link to="/" className="homePage">Total Image Encrypt</Link>
                        {/*<h1 id="headerText">Total Image Encrypt</h1>*/}
                        <Link to="/encrypt" className="encryptBtn">Encrypt</Link>
                        <Link to="/decrypt" className="decryptBtn">Decrypt</Link>
                        
                        
                    </ul>
                </div>
            </div>
        );
        
    }
}

export default Header;