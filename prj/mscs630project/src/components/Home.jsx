import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';


class Home extends Component {
    render() {
        return(
            <div>
                <Header />
                <div className="homePage">
                    <h1>Welcome to Total Image Encrypt!</h1>
                </div>
            </div>
        );
        
    }
}

export default Home;