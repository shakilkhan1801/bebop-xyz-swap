# Bebop Swap

A decentralized exchange (DEX) bot for automated token swaps on Uniswap.

## Features

- Automated token swaps on Uniswap
- Support for WETH to Token swaps
- Support for Token to Token swaps
- Configurable slippage tolerance
- Gas optimization

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or other Web3 wallet
- Ethereum network access (Mainnet, Goerli, etc.)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bebop-swap.git
cd bebop-swap
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

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/yourusername/bebop-swap/issues) page
2. Create a new issue if your problem isn't already listed
3. Join our community discussions

## Disclaimer

This software is for educational purposes only. Use at your own risk. The authors are not responsible for any financial losses incurred while using this bot.