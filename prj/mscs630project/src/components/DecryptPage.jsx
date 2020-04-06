import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Decrypt.css';


class DecryptPage extends Component {
    render() {
        return(
            <div>
                <Header />
                
                <label id="decryptImageLabel">Image to be decrypted:</label>

                <input id="decryptImageInput" type="file"></input>

                <Button id="decryptButton">Decrypt</Button>
            </div>
        );
        
    }
}

export default DecryptPage;