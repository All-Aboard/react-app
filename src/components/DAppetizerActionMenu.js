import React, { Component } from 'react';
import styled from 'styled-components';
import Btn from './Button';


class DAppetizerActionMenu extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
			<p> Buy a plate of bacon wrapped goodness? Just 0.1 ETH! </p>
			<Btn> Buy! </Btn>
			<p> Plates bought so far: 0 </p>
			<p> ETH spent on DAppetizers: 0 </p> 
			</div>);
	}
}
export default DAppetizerActionMenu;
