import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';



class EncryptPage extends Component {
    render() {
        return(
            <div>
                <Header />
                
                <div className="encrypt">
                    <ul>
                        <Button>Encrypt</Button>
                        
                        
                    </ul>
                </div>
            </div>
        );
        
    }
}

export default EncryptPage;