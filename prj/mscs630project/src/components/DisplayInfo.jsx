import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/DisplayInfo.css';



class DisplayInfo extends Component {
    render() {
        return(
            <div>
                <Header />
                
                <label id="displayTextLabel">Secret Text:</label>

                <textarea id="displayTextArea"></textarea>

                <label id="displayImageLabel">Secret Image:</label>

                <img src="./images/test.png" download></img>
                <a href='/somefile.txt' download>Click to download</a>

                
            </div>
        );
        
    }
}

export default DisplayInfo;