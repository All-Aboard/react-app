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
	    	platesBought: 0
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
		var signature = web3.eth.accounts.sign(encodedABI, this.props.wallet.privateKey);
	}

	render() {
		return(
			<div>
			<p> Buy a plate of bacon wrapped goodness? Just 0.01 ETH! </p>
			<Btn primary onClick={this.buyPlate.bind(this)} type="submit"> Buy Plate! </Btn>
			<p> Plates bought so far: {this.state.platesBought} </p>
			<p> ETH spent on DAppetizers: {this.state.ethSpent} </p> 
			</div>);
	}
}
export default DAppetizerActionMenu;
