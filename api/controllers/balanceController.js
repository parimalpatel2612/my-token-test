// api/controllers/BalanceController.js
const { ethers } = require('ethers');

/**
 * @class BalanceController
 * @description Controller for handling token balance requests with Swagger docs
 */
class BalanceController {
  constructor(tokenAddress, provider) {
    this.tokenAddress = tokenAddress;
    this.provider = provider;
    this.tokenABI = [
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() external view returns (uint8)",
      "function symbol() external view returns (string)"
    ];
  }

  
  async getBalance(req, res) {
    try {
      const { address } = req.query;
      
      if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
      }

      if (!ethers.isAddress(address)) {
        return res.status(400).json({ error: 'Invalid address format' });
      }

      const tokenContract = new ethers.Contract(this.tokenAddress, this.tokenABI, this.provider);
      
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
        tokenAddress: this.tokenAddress
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        details: error.message 
      });
    }
  }

  healthCheck(req, res) {
    res.status(200).json({ status: 'healthy' });
  }
}

module.exports = BalanceController;