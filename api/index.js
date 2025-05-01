const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration
const PORT = 8081;
const RPC_URL = 'http://127.0.0.1:8545';
// Replace with your actual deployed token address// can be store to config
const TOKEN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const provider = new ethers.JsonRpcProvider(RPC_URL);

const tokenABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)"
];

// API endpoint to check token balance
app.get('/balance', async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }

    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid address format' });
    }

    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, provider);
    
    // Get all data in parallel
    const [balance, decimals, symbol] = await Promise.all([
      tokenContract.balanceOf(address),
      tokenContract.decimals(),
      tokenContract.symbol()
    ]);
    
    const formattedBalance = ethers.formatUnits(balance, decimals);

    res.json({
      address,
      balance: formattedBalance,
      tokenSymbol: symbol,
      tokenAddress: TOKEN_ADDRESS
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Connect to Hardhat node at ${RPC_URL}`);
  console.log(`Sample request: http://localhost:${PORT}/balance?address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});