const Tx = require("ethereumjs-tx").Transaction; // require module for creating transaction object
const Web3 = require("web3"); // require the web3 module to interact with the blockchain and smartcontracts on blockchains
const dotenv = require("dotenv");

// Main idea
// We want to use our contract to send tokens from one address to another address.
// We send 1000tokens from addr1 to addr 2using the contract

// Creating a transaction
// Build the transaction object
// If it is a mainnet, sign the transaction
// Deploy or send seralised Transaction to the blockchain
dotenv.config();
// connecting to blockchain testnet rinkeby
const w3 = new Web3(
  "https://rinkeby.infura.io/v3/aafb8adb2afe49d7bfb057d4bbe3ec8c"
);

// instance of Binance Contract
const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const Contract_Address = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
const DappUniToken = new w3.eth.Contract(
  (abi = abi),
  (address = Contract_Address)
);

// public address
const addr1 = "0x2f92B9e10D44E9b3554b9a0A9EeB258B7107328c";
const addr2 = "0xbe875509Afaaf0Dc322B8D7db11EFe2d8F3F6bB7";

// private address to sign contract
const private_key = Buffer.from(process.env.Private_Key, "hex"); // addr1 private key

// transaction object
// We are sending 1 ether from our account to another account, with a gasPrice of 10 gwei and Limit of 21000
w3.eth.getTransactionCount(addr1, (err, transactionCount) => {
  const transaction_Object = {
    to: Contract_Address,
    gasPrice: w3.utils.toHex(w3.utils.toWei("10", "gwei")),
    gasLimit: w3.utils.toHex(21000),
    nonce: w3.utils.toHex(transactionCount),
    data: BinanceContract.methods.transfer(addr2, 1000).encodeABI(),
  };

  // Signing the transaction
  const tx = new Tx(transaction_Object, { chain: "rinkeby" }); // creating a new transactrion object to sign
  tx.sign(private_key); // sign the transaction using the private key

  //   Send signed transactiont to the blockchain
  const sTx = tx.serialize();
  const rawTransaction = "0x" + sTx.toString("hex");

  w3.eth.sendSignedTransaction(rawTransaction, (err, hash) => {
    console.log("TxHash:" + hash);
    console.log(err);
  });
});
