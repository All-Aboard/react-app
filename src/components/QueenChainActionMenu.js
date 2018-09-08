import React, { Component } from 'react';
import styled from 'styled-components';
import Btn from './Button';
import TextField from '@material-ui/core/TextField';



class QueenChainActionMenu extends Component {

	constructor(props) {
		super(props);
	    this.state = {
		  tea: ''
		};
	}

  	spillTea(e) {
    	this.setState({tea: e.target.value});
  	}

	render() {
		return(
			<div>
			<p> Spill the tea for 0.1 ETH! </p>
			<TextField onChange={this.spillTea.bind(this)} placeholder="The Tea..."/>
			<Btn> Spill it! </Btn>
			<p> Current spilt tea: "Becky's shoes look like the bad side of a dumpster"</p>
			<p> ETH spent on QueenChain: 0 </p> 
			</div>);
	}
}
export default QueenChainActionMenu;
