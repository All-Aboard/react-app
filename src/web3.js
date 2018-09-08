import Web3 from 'web3';
var infuraKey = require('./keys/infuraKey.json');
var web3 = "undefined"
try {
	web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/" + 'P7UbKEuUzNAwOeZrAvnb'));
} catch(err) {
	web3 = "undefined";
}

export default web3;