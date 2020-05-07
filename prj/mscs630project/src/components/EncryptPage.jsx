import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Encrypt.css';
import { AES } from "crypto-js/aes";

    
    //imageLoader.addEventListener('change', handleImage, false);
    /*
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var messageInput = document.getElementById('encryptTextInput');

    var textCanvas = document.getElementById('textCanvas');
    var tctx = textCanvas.getContext('2d');
    */

    //handle decoding
    //var decodeCanvas = document.getElementById('imageCanvas2');
    //var dctx = decodeCanvas.getContext('2d');
    //var imageLoader2 = document.getElementById('imageLoader2');
    //imageLoader2.addEventListener('change', handleImage2, false);
    
    
    

class EncryptPage extends Component {
    
    handleImage = () => {
        var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        var messageInput = document.getElementById('encryptedLabel');

        var textCanvas = document.getElementById('textCanvas');
        var tctx = textCanvas.getContext('2d');
        function handleImage(e){
            var reader = new FileReader();
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    canvas.width = img.width;
                    canvas.height = img.height;
                    textCanvas.width=img.width;
                    textCanvas.height=img.height;
                    tctx.font = "30px Arial";
              var messageText = (messageInput.value.length) ? messageInput.value : 'Hello';
                    tctx.fillText(messageText,10,50);
                    ctx.drawImage(img,0,0);
                    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    var textData = tctx.getImageData(0, 0, canvas.width, canvas.height);
                    var pixelsInMsg = 0;
                     var pixelsOutMsg = 0;
                    for (var i = 0; i < textData.data.length; i += 4) {
                        if (textData.data[i+3] !== 0) {
                            if (imgData.data[i+1]%10 == 7) {
                                //do nothing, we're good
                            }
                            else if (imgData.data[i+1] > 247) {
                                imgData.data[i+1] = 247;
                            }
                            else {
                                while (imgData.data[i+1] % 10 != 7) {
                                    imgData.data[i+1]++;
                                }
                            }
                            pixelsInMsg++;
                        }
                        else {
                            if (imgData.data[i+1]%10 == 7) {
                                imgData.data[i+1]--;
                            }
                            pixelsOutMsg++;
                        }
                    }
                    console.log('pixels within message borders: '+pixelsInMsg);
                    console.log('pixels outside of message borders: '+pixelsOutMsg);
                    ctx.putImageData(imgData, 0, 0);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    

    encryptText = () => {
        let textToEncrypt = document.getElementById('message');
        let encryptKey = document.getElementById('encryptKeyInput');
        let encryptedLabel = document.getElementById('encryptedLabel');
        
        var aesjs = require("aes-js");
        var AES = require("crypto-js/aes");
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
        encryptedLabel.value = encryptedHex;

        // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
        //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

        


        

    }

    

    wrapperFunction = () => {
        this.handleImage();
        this.encryptText();
        
    }

    render() {
        return(
            
            <div>
                
                <Header />
                
                <label id="encryptTextLabel">Text to be encryped into image:</label>

                <input id="message" type="text" placeholder="Text to be encrypted"></input>

                <label id="encryptKeyLabel">Key of 16 characters:</label>

                <input id="encryptKeyInput" type="text" placeholder="Key"></input>

                <label id="encryptImageLabel">Image to be encrypted:</label>

                <input id="encryptedLabel" hidden disabled ></input>

                <input id="imageLoader" type="file" accept="image/png, image/jpeg"></input>

                <canvas id="imageCanvas"></canvas>
	            <canvas id="textCanvas" hidden></canvas>

                <Button id="encryptButton" onClick={this.wrapperFunction}>Encrypt</Button>
            </div>
            
        );
        
    }
}

export default EncryptPage;