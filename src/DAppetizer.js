import React, { Component } from 'react';
import Btn from './components/Button';
import WalletDetailsPane from './components/WalletDetailsPane';
import TextField from '@material-ui/core/TextField';
import { LOADING } from './StyleGuide';
import logo from './imgs/appetizer.jpg';
import './App.css';

const ethers = require('ethers');

class DAppetizer extends Component {



  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      wallet: '',
      isCreatingWallet: false
    };
  }

  componentDidMount(){
    var storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      this.setState({wallet: storedWallet, username: localStorage.getItem('username')});
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  async createEthAddress(e) {
    this.setState({isCreatingWallet: true});
    var newWallet;
    await ethers.Wallet.fromBrainWallet(this.state.username, this.state.password).then(function(wallet){
      console.log(wallet)
      newWallet = wallet;
    })

    // MAKE CALL TO API TO CREATE MULTI-SIG WALLET
    this.setState({wallet: newWallet, isCreatingWallet: false});
    localStorage.setItem('username', this.state.username);
    localStorage.setItem('wallet', this.state.wallet);
  }


  render() {

    var walletDetailsPane = <div></div>
    var actionMenu = <div></div>
    var login =
    <div> 
        <div>
          <TextField onChange={this.handleUsernameChange.bind(this)} placeholder="Username"/>
        </div> 
        <div>
          <TextField type='Password' onChange={this.handlePasswordChange.bind(this)} placeholder="Password"/>
        </div>
        <div>
          <Btn primary onClick={this.createEthAddress.bind(this)} type="submit"> Create Account </Btn>
        </div>
    </div>  

    if (this.state.wallet === '' && this.state.isCreatingWallet === true) {
      login = <LOADING> <i className="fa fa-circle-o-notch fa-spin"></i> Creating Account... </LOADING>
    }
    if (this.state.wallet !== '') {
      login = <div>Welcome, {this.state.username}</div>
    }



    return (
      <div className="App">
      	<h1> Welcome to DAppetizer</h1>
      	<img src={logo} width="500" height="300" />
      	<p> The tastiest DApp on the Blockchain </p>
        {walletDetailsPane}
        {login}
        {actionMenu}
      </div>
    );
  }
}

export default DAppetizer;
