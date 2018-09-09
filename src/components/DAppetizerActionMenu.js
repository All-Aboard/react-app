import React, { Component } from 'react';
import styled from 'styled-components';
import Btn from './Button';
import web3 from '../web3'
import DAppetizer from '../DAppContracts/DAppetizer'

class DAppetizerActionMenu extends Component {

	constructor(props) {
		super(props);
	    this.state = {
	    	ethSpent: 0,
	    	platesBought: 0,
	    	isLoading: false,
	    	errored: false
    	};
    	this.updateInformation();
	}

	async updateInformation() {
		DAppetizer.getPastEvents('AppBought', {
		fromBlock: 4000329,
		toBlock: 'latest'
		}, async (err, events) => {
			if (!err){
				this.setState({platesBought: events[events.length - 1].returnValues.AppsBought, ethSpent: (events[events.length - 1].returnValues.ethEarned / 1000000000000000000)})
			} else {
				console.log(err);
			}
		});
	}

	async buyPlate(){
		var encodedABI = DAppetizer.methods.buyAppetizer().encodeABI();
		//var signature = web3.eth.accounts.sign(encodedABI, this.props.wallet.privateKey);
		this.setState({isLoading: true})
		this.sendSignData(encodedABI, DAppetizer.options.address, '0x0');
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

	render() {
		var loading = <div></div>
		var content = <div>				<p> Buy a plate of bacon wrapped goodness? </p>
			<Btn primary onClick={this.buyPlate.bind(this)} type="submit"> Buy Plate! </Btn>
			<p> Plates bought so far: {this.state.platesBought} </p></div>

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
export default DAppetizerActionMenu;
