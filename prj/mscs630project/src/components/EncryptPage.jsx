import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Encrypt.css';



class EncryptPage extends Component {
    render() {
        return(
            <div>
                <Header />
                
                <label id="encryptTextLabel">Text to be encryped into image:</label>

                <input id="encryptTextInput" type="text" placeholder="Text to be encrypted"></input>

                <input id="encryptImageInput" type="file"></input>

                <Button id="encryptButton">Encrypt</Button>
            </div>
        );
        
    }
}

export default EncryptPage;