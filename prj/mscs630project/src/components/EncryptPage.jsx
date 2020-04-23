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

       
   
   
   //handle decoding
   //var decodeCanvas = document.getElementById('imageCanvas2');
   //var dctx = decodeCanvas.getContext('2d');
   //var imageLoader2 = document.getElementById('imageLoader2');
       //imageLoader2.addEventListener('change', handleImage2, false);
   
   
   /*
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
   }
   */


        

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

                <input id="imageLoader" type="file"></input>

                <canvas id="imageCanvas"></canvas>
	            <canvas id="textCanvas"></canvas>

                <Button id="encryptButton" onClick={this.wrapperFunction}>Encrypt</Button>
            </div>
        );
        
    }
}

export default EncryptPage;