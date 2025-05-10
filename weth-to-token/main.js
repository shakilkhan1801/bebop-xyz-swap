const axios = require("axios");
const ethers = require("ethers");
require('dotenv').config(); // Load .env configuration

// Trade Info
let privateKey = process.env.PRIVATE_KEY; // Load private key from .env
let tokensAddressesSell = ["0xA51894664A773981C6C112C43ce576f315d5b1B6"]; // WETH token address
let tokensSellAmounts = [ethers.utils.parseEther("0.0005")]; // 0.0005 WETH to sell
let tokensAddressBuy = ["0x07d83526730c7438048D55A4fc0b850e2aaB6f0b"]; // USDC token address
let chain = {
    chainId: 167000, // Taiko chain ID
    name: "taiko" // Taiko network
};

// Constants
const BEBOP_ADDRESS = "0xbEbEbEb035351f58602E0C1C8B59ECBfF5d5f47b"; // Settlement contract for Taiko network
const PARAM_TYPES = {
    "JamOrder": [
        { "name": "taker", "type": "address" },
        { "name": "receiver", "type": "address" },
        { "name": "expiry", "type": "uint256" },
        { "name": "nonce", "type": "uint256" },
        { "name": "executor", "type": "address" },
        { "name": "minFillPercent", "type": "uint16" },
        { "name": "hooksHash", "type": "bytes32" },
        { "name": "sellTokens", "type": "address[]" },
        { "name": "buyTokens", "type": "address[]" },
        { "name": "sellAmounts", "type": "uint256[]" },
        { "name": "buyAmounts", "type": "uint256[]" },
        { "name": "sellNFTIds", "type": "uint256[]" },
        { "name": "buyNFTIds", "type": "uint256[]" },
        { "name": "sellTokenTransfers", "type": "bytes" },
        { "name": "buyTokenTransfers", "type": "bytes" },
    ]
};

const PARAM_DOMAIN = {
    name: "JamSettlement",
    version: "1",
    chainId: chain.chainId, // Updated to Taiko's chain ID
    verifyingContract: BEBOP_ADDRESS, // Settlement contract for Taiko network
};

// Function to get quote and submit it onchain
async function sendTx() {
    try {
        // Init wallet and provider
        let account = new ethers.Wallet(privateKey);

        // Get quote from Bebop API
        let quote = (await axios.get(`https://api.bebop.xyz/jam/${chain.name}/v1/quote`, {
            params: {
                buy_tokens: tokensAddressBuy.toString(),
                sell_tokens: tokensAddressesSell.toString(),
                sell_amounts: tokensSellAmounts.toString(),
                taker_address: account.address
            }
        })).data;
        console.log("Quote:", quote);

        // Sign the quote
        let signature = await account._signTypedData(PARAM_DOMAIN, PARAM_TYPES, quote.toSign);

        // Send the transaction
        let response = (await axios.post(`https://api.bebop.xyz/jam/${chain.name}/v1/order`, {
            signature: signature,
            quote_id: quote.quoteId,
        }, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })).data;
        console.log("Order response:", response);
    } catch (error) {
        console.error("Error in transaction:", error);
    }
}

sendTx();