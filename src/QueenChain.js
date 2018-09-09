import React, { Component } from 'react';
import Btn from './components/Button';
import QueenChainActionMenu from './components/QueenChainActionMenu';
import TextField from '@material-ui/core/TextField';
import { LOADING } from './StyleGuide';
import logo from './imgs/queenchain.jpg';
import './App.css';

const ethers = require('ethers');

class QueenChain extends Component {



  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      wallet: '',
      identity: '',
      isCreatingWallet: false
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
      newWallet = wallet;
    })

    // MAKE CALL TO API TO CREATE MULTI-SIG WALLET
    this.setState({wallet: JSON.stringify(newWallet)});
    localStorage.setItem('username', this.state.username);
    localStorage.setItem('wallet', this.state.wallet);
    this.loadWalletData(newWallet, this.state.username)
  }

  async loadWalletData(wallet, username){

    console.log(wallet)
    var request = require('request');

    var headers = {
        'Content-Type': 'application/json'
    };

    var dataString = '{"account": "' + wallet.address + '", "ensName": "'+ username +'"}';

    var options = {
        url: 'http://35.172.185.48:3000/v1/bootstrap',
        method: 'POST',
        headers: headers,
        body: dataString
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
            console.log(body);
            localStorage.setItem('identity', JSON.parse(body).address);
            this.setState({identity: JSON.parse(body).address, isCreatingWallet: false});
        }
    });
  }

  // TODO: Validate password, right now just placeholder
  render() {

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
          <TextField type='Password' placeholder="Validate Password"/> 
        </div>
        <div>
          <Btn primary onClick={this.createEthAddress.bind(this)} type="submit"> Create Account </Btn>
        </div>
    </div>  

    if (!this.state.identity && this.state.isCreatingWallet === true) {
      login = <LOADING> <i className="fa fa-circle-o-notch fa-spin"></i> Creating Account... </LOADING>
    }
    if (this.state.identity) {
      login = <div><h2>Welcome, {this.state.username}</h2></div>
      actionMenu = <QueenChainActionMenu identity={this.state.identity} wallet={this.state.wallet}/>
    }



    return (
      <div className="App">
      	<h1> Welcome to QueenChain...</h1>
        <p> Spill the tea, throw some shade, and find your sugar daddy. </p>
        <img src={logo} width="500" height="300" />
        {login}
        {actionMenu}
      </div>
    );
  }
}

export default QueenChain;
