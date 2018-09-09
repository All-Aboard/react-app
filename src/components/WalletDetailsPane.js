import React, { Component } from 'react';
import styled from 'styled-components';
import Identity from '../DAppContracts/Identity'



class WalletDetailsPane extends Component {

	constructor(props) {
		super(props);
    	this.state = {
    		balance: 0
		};
		this.getBalance();
		console.log(this.props.identity);
	}


	async getBalance(){
		Identity.options.address = this.props.identity;
		Identity.methods.fundedAmount().call((err, res) => {
    		this.setState({balance: res});
		});
	}

	render() {

		return(
			<div>
			Allowance: {this.state.balance} ETH
			</div>);
	}
}
export default WalletDetailsPane;
