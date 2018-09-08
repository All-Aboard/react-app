const ethers = require('ethers');

const address = '0x238073144ad9e3e9640d7821d7d7dde47fdc3545'
const abi = [{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"spillTea","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ethEarned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentTea","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_message","type":"string"},{"indexed":false,"name":"ethEarned","type":"uint256"}],"name":"SpillTea","type":"event"}]

contract = new ethers.Contract(address, abi, localStorage.get('wallet'));
export default contract;
