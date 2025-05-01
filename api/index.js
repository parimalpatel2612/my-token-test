const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const PORT = 8081;
const RPC_URL = 'http://127.0.0.1:8545';
const TOKEN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const swaggerDocument = YAML.load(path.join(__dirname, '../config/swagger.yaml'));

app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(RPC_URL);
const BalanceController = require('./controllers/BalanceController');
const balanceController = new BalanceController(TOKEN_ADDRESS, provider);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/balance', (req, res) => balanceController.getBalance(req, res));
app.get('/health', (req, res) => balanceController.healthCheck(req, res));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});