import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/styles/Header.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';  

import Header from './components/Header.jsx';

import Home from './components/Home.jsx';
import Encrypt from './components/EncryptPage';
import Decrypt from './components/DecryptPage';
import DisplayInfo from './components/DisplayInfo';


const HomePage = () => <Home/>;
const EncryptPage = () => <Encrypt/>;
const DecryptPage = () => <Decrypt/>;
const DisplayPage = () => <DisplayInfo/>;


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage}/>
        <Route path="/encrypt" component={EncryptPage}/>
        <Route path="/decrypt" component={DecryptPage}/>
        <Route path="/displayinfo" component={DisplayPage}/>
        
          
          
          
        
      </div>
    </Router>
  );
}

export default App;
