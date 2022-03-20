/*
Utilities provides specific functions to enable our interaction
with the blockchain easier. Example of Utilities are
converting to Wei , Converting to Ether, hash a data using sha3,keccak256 and so on
*/
const Web3 = require("web3");

const w3 = new Web3(
  "https://mainnet.infura.io/v3/aafb8adb2afe49d7bfb057d4bbe3ec8c"
);

// We can convert from Wei to ether
var result = w3.utils.fromWei("100000", "ether");
console.log(result);

// Convert a string to Hexadecimal which is mostly used when creating a transaction object
var result = w3.utils.toHex("ABC");
console.log(result);

// You can encrypt a data using solidity sha3 or sha384
var result = w3.utils.keccak256("MyPassword");
console.log(result);
