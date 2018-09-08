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
				console.log(events[events.length - 1])
				this.setState({platesBought: events[events.length - 1].returnValues.AppsBought, ethSpent: (events[events.length - 1].returnValues.ethEarned / 1000000000000000000)})
			} else {
				console.log(err);
			}
		});
	}

	render() {
		return(
			<div>
			<p> Buy a plate of bacon wrapped goodness? Just 0.1 ETH! </p>
			<Btn> Buy! </Btn>
			<p> Plates bought so far: {this.state.platesBought} </p>
			<p> ETH spent on DAppetizers: {this.state.ethSpent} </p> 
			</div>);
	}
}
export default DAppetizerActionMenu;
