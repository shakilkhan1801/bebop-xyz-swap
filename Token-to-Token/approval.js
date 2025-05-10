const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.TAIKO_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ERC20 Token contract address
const TOKEN_CONTRACT_ADDRESS = "0x07d83526730c7438048D55A4fc0b850e2aaB6f0b"; // Example token address (USDC)
const SPENDER_ADDRESS = "0xfE96910cF84318d1B8a5e2a6962774711467C0be";

// ERC20 ABI (standard functions)
const ERC20_ABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function balanceOf(address owner) public view returns (uint256)",
    "function allowance(address owner, address spender) public view returns (uint256)",
    "function decimals() public view returns (uint8)" // Added decimals function
];

const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, ERC20_ABI, wallet);

async function approveToken(spender, amount) {
    try {
        // Get the token's decimals
        const decimals = await tokenContract.decimals();
        
        // Convert the amount to the correct decimal format
        const amountToApprove = ethers.utils.parseUnits(amount.toString(), decimals); 
        
        // Set custom gas price and gas limit
        const gasPrice = ethers.utils.parseUnits("0.15", "gwei"); // Example: 0.15 Gwei
        const gasLimit = 1000000; // Example: 1,000,000 gas limit

        // Sending the approval transaction with custom gas settings
        const tx = await tokenContract.approve(spender, amountToApprove, {
            gasPrice: gasPrice,
            gasLimit: gasLimit
        });

        console.log("Approval transaction sent:", tx.hash);

        await tx.wait(); // Wait for transaction confirmation
        console.log("Approval successful!");
    } catch (error) {
        console.error("Error during approval:", error.message);
        if (error.code === 'NETWORK_ERROR') {
            console.error("Check if the RPC URL is correct and the network is available.");
        }
    }
}

// Example usage: Approve 1 of the specified token for the spender address
approveToken(SPENDER_ADDRESS, 1000000);