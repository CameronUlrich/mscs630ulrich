import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Encrypt.css';




class EncryptPage extends Component {

    encryptText = () => {
        let textToEncrypt = document.getElementById('encryptTextInput');
        
        var aesjs = require("aes-js")
        // the AES block cipher algorithm works on 16 byte bloca ks, no more, no less
        var text = textToEncrypt.value;
        var textAsBytes = aesjs.utils.utf8.toBytes(text)
        console.log(textAsBytes);
        // [65, 66, 108, 111, 99, 107, 73, 115, 49, 54, 66, 121, 116, 101, 115, 33]

        // create an instance of the block cipher algorithm
        var key = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3];
        var aes = new aesjs.AES(key);

        // encrypt...
        var encryptedBytes = aes.encrypt(textAsBytes);
        console.log(encryptedBytes);
        // [136, 15, 199, 174, 118, 133, 233, 177, 143, 47, 42, 211, 96, 55, 107, 109] 

        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        console.log(encryptedHex);
        // "880fc7ae7685e9b18f2f2ad360376b6d"

        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

        // decrypt...
        var decryptedBytes = aes.decrypt(encryptedBytes);
        console.log(decryptedBytes);
        // [65, 66, 108, 111, 99, 107, 73, 115, 49, 54, 66, 121, 116, 101, 115, 33]


        // decode the bytes back into our original text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);

    }

    render() {
        return(
            <div>
                <Header />
                
                <label id="encryptTextLabel">Text to be encryped into image:</label>

                <input id="encryptTextInput" type="text" placeholder="Text to be encrypted"></input>

                <label id="encryptImageLabel">Image to be encrypted:</label>

                <input id="encryptImageInput" type="file"></input>

                <Button id="encryptButton" onClick={this.encryptText}>Encrypt</Button>
            </div>
        );
        
    }
}

export default EncryptPage;