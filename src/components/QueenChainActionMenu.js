import React, { Component } from 'react';
import styled from 'styled-components';
import Btn from './Button';
import TextField from '@material-ui/core/TextField';
import web3 from '../web3'
import QueenChain from '../DAppContracts/QueenChain'



class QueenChainActionMenu extends Component {

	constructor(props) {
		super(props);
	    this.state = {
		  tea: '',
		  newTea:'',
		  ethSpent: 0,
		  isLoading: false,
		  errored: false
		};
		this.updateInformation();
	}

  	updateText(e) {
    	this.setState({newTea: e.target.value});
  	}

	async updateInformation() {
		QueenChain.getPastEvents('SpillTea', {
		fromBlock: 4000329,
		toBlock: 'latest'
		}, async (err, events) => {
			if (!err){
				this.setState({tea: events[events.length - 1].returnValues._message, ethSpent: (events[events.length - 1].returnValues.ethEarned / 1000000000000000000)})
			} else {
				console.log(err);
			}
		});
	}

	async spillTea(){
		var encodedABI = QueenChain.methods.spillTea(this.state.newTea).encodeABI();
		// var signature = web3.eth.accounts.sign(encodedABI, this.props.wallet.privateKey);
		this.setState({isLoading: true})
		this.sendSignData(encodedABI, QueenChain.options.address, '0x00000000000000000');
	}

	async sendSignData(dataSign, toAddr, value){
	    var request = require('request');

	    var headers = {
	        'Content-Type': 'application/json'
	    };

	    var dataString = JSON.stringify({dataSign, toAddr, value});

	    var options = {
	        url: 'http://35.172.185.48:3000/v1/forward',
	        method: 'POST',
	        headers: headers,
	        body: dataString
	    };

	    request(options, (error, response, body) => {
	      if (!error && response.statusCode == 200) {
	      	console.log("Success!");
	      	window.location.reload();
	      } else if (error) {
	      	this.setState({errored: true})
	      }
	    });
	}

	//<p> ETH spent on QueenChain: {this.state.ethSpent} </p>

	render() {

		var loading = <div></div>
		var content = <div>			<p> Spill the tea! </p>
			<TextField onChange={this.updateText.bind(this)} placeholder="The Tea..."/>
			<Btn primary onClick={this.spillTea.bind(this)} type="submit"> Spill it! </Btn>
			<p> Current spilt tea: {this.state.tea}</p></div>

		if (this.state.isLoading){
			loading = <div>ENACTING TRANSACTION, PLEASE WAIT....</div>
			content = <div></div>
		} 
		if (this.state.errored) {
			loading = <div>TRANSACTION FAILED, PLEASE REFRESH</div>
			content = <div></div>
		}
		return(
			<div>
			{content}
			{loading}
			</div>);
	}
}
export default QueenChainActionMenu;
