import React, { Component } from 'react';
import Btn from './components/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

const ethers = require('ethers');

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  createEthAddress(e) {
    // TODO: Brain wallet isn't working?
    // ethers.Wallet.fromBrainWallet(this.state.username, this.state.password).then(function(wallet) {
    //   console.log("Address: " + wallet.address);
    // });
    var account = ethers.Wallet.createRandom();
    console.log("Created ETH Address: " + JSON.stringify(account));
  }


  render() {
    return (
      <div className="App">
        <div>
          <TextField onChange={this.handleUsernameChange.bind(this)} placeholder="Username"/>
        </div> 
        <div>
          <TextField type='Password' onChange={this.handlePasswordChange.bind(this)} placeholder="Password"/>
        </div>
        <div>
          <Btn primary onClick={this.createEthAddress.bind(this)} type="submit">Create Account </Btn>
        </div>
      </div>
    );
  }
}

export default App;
