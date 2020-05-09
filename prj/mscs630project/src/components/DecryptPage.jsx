import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';
import './styles/Decrypt.css';
import { AES } from "crypto-js/aes";




class DecryptPage extends Component {

    validatePage = () =>{
        //console.log("Test");
        
        let textToDecrypt = document.getElementById('decryptTextInput');
        var imageLoader = document.getElementById('imageLoader2');
        let decryptKey = document.getElementById('decryptKeyInput'); 
        let decryptButton = document.getElementById('decryptKeyButton');

        if(decryptKey.value != "" && textToDecrypt.value != ""){
            if(decryptKey.value.length === 16 || decryptKey.value.length === 32){
                decryptButton.disabled = false;
                //console.log("undisabled");
            }
            else{
                decryptButton.disabled = true;
                

            }
            
        }
        else{
            decryptButton.disabled = true;
            //console.log("jksjfk");
        }
        
    }


    

    handleImage2 = () => {

        

        //handle decoding
        var decodeCanvas = document.getElementById('imageCanvas2');
        var dctx = decodeCanvas.getContext('2d');
        var imageLoader2 = document.getElementById('imageLoader2');
        imageLoader2.addEventListener('change', handleImage2, false);
    
    
    
        function handleImage2(e){
            
            console.log('handle image 2');
            var reader2 = new FileReader();
            reader2.onload = function(event){
                console.log('reader2 loaded');
                var img2 = new Image();
                img2.onload = function(){
                    console.log('img2 loaded');
                    decodeCanvas.width = img2.width;
                    decodeCanvas.height = img2.height;
                    dctx.drawImage(img2,0,0);
                    var decodeData = dctx.getImageData(0, 0, decodeCanvas.width, decodeCanvas.height);
                    for (var i = 0; i < decodeData.data.length; i += 4) {
                        if (decodeData.data[i+1] % 10 == 7) {
                            decodeData.data[i] = 0;
                            decodeData.data[i+1] = 0;
                            decodeData.data[i+2] = 0;
                            decodeData.data[i+3] = 255;
                        }
                        else {
                            decodeData.data[i+3] = 0;
                        }
                    }
                    dctx.putImageData(decodeData, 0, 0);
                };
                img2.src = event.target.result;
            };
            reader2.readAsDataURL(e.target.files[0]);
            //decryptedText = reader2.readAsDataURL(e.target.files[0]);
            //console.log(decryptedText);
    }
    

    }

    decryptText = () => {
        let secretMessageText = document.getElementById('secretMessage');

        let textToDecrypt = document.getElementById('decryptTextInput');
        console.log(textToDecrypt.textContent);

        let decryptKey = document.getElementById('decryptKeyInput');

        var aesjs = require("aes-js");
        var AES = require("crypto-js/aes");

        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes = aesjs.utils.hex.toBytes(textToDecrypt.value);

        var keyArray = [];
        var keyTest = decryptKey.value;
        var i;
        for(i = 0; i < keyTest.length; i++){
            
            keyArray[i] = keyTest.charAt(i);
            keyArray[i] = parseInt(keyArray[i]);

        }
        
        
        var key = keyArray;

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        console.log(decryptedText);
        secretMessageText.innerHTML = "Secret Message: " + decryptedText;
        
        



        // "Text may be any length you wish, no padding is required."

        //var ctx = document.getElementById('encryptImageInput').getContext('2d');;
        //var imgd = ctx.getImageData(0,0,ctx.width,ctx.height);
        //var pixelArray = imgd.data;

        //console.log(ctx);
        //console.log(imgd);
        //console.log(pixelArray);
        /*
        var imageLoader = document.getElementById('encryptImageInput');
        

        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        var messageInput = document.getElementById('message');

        var reader = new FileReader();
        */

       
   
   
    

    }
    decryptWrapper = () =>{
        this.validatePage();
        this.decryptText();

    }

    wrapperFunction = () => {
        this.handleImage2();
        
        //this.decryptText();
        
    }

    render() {
        return(
            <div>
                <Header />
                
                <label id="decryptImageLabel">Image to be decrypted:</label>

                <input id="imageLoader2" type="file" accept="image/png, image/jpeg" onClick={this.handleImage2}></input>

                <label id="decryptKeyLabel">Key:</label>

                <input id="decryptKeyInput" type="number" placeholder="Key" min="16" max="32" class="glowing-border" onChange={this.validatePage} title="Type the key of 16 or 32 digits"></input>

                <label id="decryptTextLabel" >Encrypted Text:</label>

                <input id="decryptTextInput" type="text" placeholder="Encrypted Text" class="glowing-border" onChange={this.validatePage} title="Type the encrypted message that appears below"></input>

                

                <Button id="decryptButton" onClick={this.wrapperFunction}>Decrypt Image</Button>

                <Button id="decryptKeyButton" onClick={this.decryptWrapper} disabled title="This button is disabled unless the key is 16 or 32 digits">Decrypt Text</Button>

                <label id="secretMessage">Secret Message:</label>

                <canvas id="imageCanvas2"></canvas>
                <label id="testDecrypt" disabled ></label>
            </div>
        );
        
    }
}

export default DecryptPage;