# Bebop Swap

A decentralized exchange (DEX) bot for automated token swaps on Bebop.

> **Sources**:
> - [Bebop Official Documentation](https://help.bebop.xyz/en/articles/6719535-is-bebop-open-source)
> - [Bebop Router API Playground](https://api.bebop.xyz/router/ethereum/docs)

## Features

- Automated token swaps on Bebop
- Support for multiple networks (Ethereum, Arbitrum, Base, Blast, Optimism, Polygon POS & Taiko)
- Support for WETH to Token swaps
- Support for Token to Token swaps
- Configurable slippage tolerance
- Gas optimization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or other Web3 wallet
- Network access (Ethereum, Arbitrum, etc.)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shakilkhan1801/bebop-xyz-swap.git
cd bebop-xyz-swap
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:
```env
PRIVATE_KEY=your_wallet_private_key
INFURA_URL=your_infura_url
```

## Network Configuration

### Bebop Contract Addresses

> **Note**: All contract addresses are sourced from [Bebop's official documentation](https://help.bebop.xyz/en/articles/6719535-is-bebop-open-source). For API integration details, refer to the [Bebop Router API Playground](https://api.bebop.xyz/router/ethereum/docs).

1. **PMM RFQ Settlement Smart Contract**:
   - Address: `0xbbbbbBB520d69a9775E85b458C58c648259FAD5F`
   - Same address on all supported networks

2. **JAM Smart Contract**:
   | Network | Settlement | Balance Manager |
   |---------|------------|-----------------|
   | Ethereum, Arbitrum, Polygon, BNB Chain, Blast, Mode, Optimism, Base, Scroll, Taiko | 0xbEbEbEb035351f58602E0C1C8B59ECBfF5d5f47b | 0xfE96910cF84318d1B8a5e2a6962774711467C0be |
   | zkSync | 0x574d1fcF950eb48b11de5DF22A007703cbD2b129 | 0x10D7a281c39713B34751Fcc0830ea2AE56D64B2C |

### Configuration Steps

1. **Network Selection**:
   - Open `config.js`
   - Set the desired network:
     ```javascript
     const chainId = 1; // 1 for Ethereum, 137 for Polygon, etc.
     const chainName = "ethereum"; // ethereum, polygon, arbitrum, etc.
     ```

2. **Contract Addresses**:
   - Update `BEBOP_ADDRESS` with the correct PMM RFQ Settlement address
   - Update `SPENDER_ADDRESS` in `approval.js` based on your selected network

3. **Token Addresses**:
   - In `tokensAddressesSell`, add the token address you want to sell
   - In `tokensAddressBuy`, add the token address you want to buy
   - Example:
     ```javascript
     const tokensAddressesSell = ["0x..."]; // Token to sell
     const tokensAddressBuy = ["0x..."]; // Token to buy
     ```

## Wallet Setup

1. **MetaMask Installation**:
   - Install MetaMask browser extension from [metamask.io](https://metamask.io)
   - Create a new wallet or import existing one
   - Make sure you have some ETH (or network's native token) for gas fees

2. **Getting Private Key**:
   - Open MetaMask
   - Click on three dots (⋮) next to your account
   - Go to "Account Details"
   - Click "Export Private Key"
   - Enter your MetaMask password
   - Copy the private key and paste it in your `.env` file

3. **Infura Setup**:
   - Go to [infura.io](https://infura.io)
   - Create a free account
   - Create a new project
   - Copy the project's HTTP endpoint
   - Paste it in your `.env` file as INFURA_URL

4. **Token Approvals**:
   - Before swapping, you need to approve tokens for Bebop
   - Run the approval script first:
   ```bash
   node approval.js
   ```
   - This will set the approval amount for Bebop to spend your tokens
   - The approval amount (e.g., 1000000) is the maximum amount you can swap
   - If you want to swap more tokens later, you'll need to run the approval script again with a higher amount
   - After running the approval script, you'll see a transaction in MetaMask
   - Click "Confirm" in MetaMask to complete the approval
   - Once approved, you can run the swap script multiple times up to the approved amount

## Usage

### WETH to Token Swap

```bash
node weth-to-token/index.js
```

### Token to Token Swap

```bash
node Token-to-Token/index.js
```

## Configuration

You can configure the following parameters in your `.env` file:

- `PRIVATE_KEY`: Your wallet's private key
- `INFURA_URL`: Your Infura project URL
- `SLIPPAGE_TOLERANCE`: Maximum allowed slippage (default: 0.5%)
- `GAS_LIMIT`: Maximum gas limit for transactions

## Security

⚠️ **Important Security Notes:**

1. Never commit your `.env` file or expose your private keys
2. Always test with small amounts first
3. Be aware of potential front-running risks
4. Monitor gas prices before executing swaps
5. Never share your private key with anyone
6. Use a dedicated wallet for testing
7. Always verify contract addresses before swapping

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/shakilkhan1801/bebop-xyz-swap/issues) page
2. Create a new issue if your problem isn't already listed
3. Join our community discussions

## Disclaimer

This software is for educational purposes only. Use at your own risk. The authors are not responsible for any financial losses incurred while using this bot.
