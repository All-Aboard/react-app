import React, { Component } from 'react';
import Btn from './components/Button';
import WalletDetailsPane from './components/WalletDetailsPane';
import TextField from '@material-ui/core/TextField';
import { LOADING } from './StyleGuide';
import './App.css';

const ethers = require('ethers');

class Home extends Component {



  constructor(props) {
    super(props);
    this.state = {
      username: '',
      wallet: ''
    };
  }

  componentDidMount(){
    var storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      this.setState({wallet: storedWallet, username: localStorage.getItem('username')});
    }
  }

  render() {
    var welcomeMessage = <div> <h1> Welcome to EnterCrypto! </h1> 
    <div>Choose your favorite DApp in the top right menu to begin!</div> </div>

    return (
      <div className="App">
        {welcomeMessage}
      </div>
    );
  }
}

export default Home;
