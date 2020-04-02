import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Header from './Header';



class DecryptPage extends Component {
    render() {
        return(
            <div>
                <Header />
                
                <div className="decrypt">
                    <ul>
                        <Button>Decrypt</Button>
                        
                        
                    </ul>
                </div>
            </div>
        );
        
    }
}

export default DecryptPage;