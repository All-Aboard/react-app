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
      wallet: '',
      identity: ''
    };
  }

  componentDidMount(){
    var storedIdentity = localStorage.getItem('identity');
    if (storedIdentity) {
      this.setState({
        wallet: JSON.parse(localStorage.getItem('wallet')), 
        username: localStorage.getItem('username'), 
        identity: localStorage.getItem('identity')
      });
    }
  }

  logOut(){
    localStorage.clear();
    this.setState();
    window.location.reload();
  }

  render() {
    var welcomeMessage = <div> <h1> Welcome to EnterCrypto! </h1> 
    <div>Choose your favorite DApp in the top right menu to begin!</div></div>
    var walletInformation = <div></div>
    var logOut = <div></div>

    if (this.state.username !== '') {
      welcomeMessage = <div><h1>Welcome, {this.state.username}</h1></div>
      walletInformation = <div> Multi-sig Wallet Info </div>
      logOut = <div><Btn primary onClick={this.logOut.bind(this)} type="submit"> Log Out </Btn></div>
    }
    return (
      <div className="App">
        {welcomeMessage}
        {walletInformation}
        {logOut}
      </div>
    );
  }
}

export default Home;
