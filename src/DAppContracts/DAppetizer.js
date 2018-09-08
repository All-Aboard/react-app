const ethers = require('ethers');

const address = '0x30c82fc04dbf37c1fd21291288ecc1f2acf70375'
const abi = [{"constant":false,"inputs":[],"name":"buyAppetizer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"numApps","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ethEarned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"AppsBought","type":"uint256"},{"indexed":false,"name":"ethEarned","type":"uint256"}],"name":"AppBought","type":"event"}]

contract = new ethers.Contract(address, abi, localStorage.get('wallet'));
export default contract;
