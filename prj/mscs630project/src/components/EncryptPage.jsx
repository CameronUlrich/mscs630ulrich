import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Encrypt.css';




class EncryptPage extends Component {

    encryptText = () => {
        let textToEncrypt = document.getElementById('encryptTextInput');
        let encryptKey = document.getElementById('encryptKeyInput');
        
        var aesjs = require("aes-js");
        // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
        var keyArray = [];
        var keyTest = encryptKey.value;
        var i;
        for(i = 0; i < keyTest.length; i++){
            
            keyArray[i] = keyTest.charAt(i);
            keyArray[i] = parseInt(keyArray[i]);

        }
        
        
        var key = keyArray;

        // Convert text to bytes
        var text = textToEncrypt.value;
        var textBytes = aesjs.utils.utf8.toBytes(text);

        // The counter is optional, and if omitted will begin at 1
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);

        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        console.log(encryptedHex);
        // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
        //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);
        // "Text may be any length you wish, no padding is required."

    }

    render() {
        return(
            <div>
                <Header />
                
                <label id="encryptTextLabel">Text to be encryped into image:</label>

                <input id="encryptTextInput" type="text" placeholder="Text to be encrypted"></input>

                <label id="encryptKeyLabel">Key of 16 characters:</label>

                <input id="encryptKeyInput" type="text" placeholder="Key"></input>

                <label id="encryptImageLabel">Image to be encrypted:</label>

                <input id="encryptImageInput" type="file"></input>

                <Button id="encryptButton" onClick={this.encryptText}>Encrypt</Button>
            </div>
        );
        
    }
}

export default EncryptPage;