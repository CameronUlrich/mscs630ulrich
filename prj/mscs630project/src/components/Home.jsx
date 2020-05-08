import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Home.css';


class Home extends Component {
    render() {
        return(
            <div>
                <Header />
                <div className="homePage">
                    <h1 id="welcomeText">Welcome to Total Image Encrypt!</h1>
                    
                    <h2 id="descriptionText">This is an encryption project created by Cameron Ulrich for
                        Marist MSCS 630 Security Algorithms and Protocols.
            
                    </h2>

                    <br></br>
                    <br></br>
                    <br></br>

                    <br></br>
                    <br></br>
                    <br></br>

                    <h2 id="objectiveText">
                        The objective for this project is to be able to send encrypted messages to another user.
                        This project first encrypts a text based on a key, embeds the encrypted text into an image, and
                        allows the user to save this image to their computer.

                        They can then send the image to another user (which looks just like the original image) and decrypt the image
                        to get the secret text.

                    </h2>

                    <img src="Header_Encryption.png" id="homeImage"></img>
                </div>
            </div>
        );
        
    }
}

export default Home;