import web3 from '../web3';

const address = '0xb8d5277874067e02ed2f83888b43d762b01d9f10'
const abi = [{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"spillTea","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ethEarned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentTea","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_message","type":"string"},{"indexed":false,"name":"ethEarned","type":"uint256"}],"name":"SpillTea","type":"event"}]

var contract = "undefined";
if (web3 !== "undefined") {
  contract = new web3.eth.Contract(abi, address);
}
export default contract;
