# Ethereum Token Balance API

A complete solution for deploying ERC-20 tokens to Hardhat and checking balances via API, with OpenAPI documentation.

## Setup Options

### 1. Manual Local Setup (Without Docker)

#### Prerequisites
- Node.js v18+
- npm or yarn
- Git (optional)

#### Installation
```bash
https://github.com/parimalpatel2612/my-token-test
cd my-token-test
npm install# my-token-test


## Running the Services
1. Start Hardhat node (Terminal 1):
    ```bash
    npx hardhat node
2. Deploy contracts (Terminal 2):
   ```bash
    npx hardhat run scripts/deploy.js --network localhost
3. Start API server (Terminal 3):
   ```bash
   node api/index.js
```
## Access Endpoints
API Docs: http://localhost:3000/api-docs

## Sample Request:
    http://localhost:8081/balance?address=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

### 2. Docker Setup (Recommended)
    Prerequisites

    > Docker Desktop
    > Docker Compose

# Quick Start
    ```bash
    https://github.com/parimalpatel2612/my-token-test
    cd my-token-test
    # Build and start containers
    docker-compose up --build
    ```
## Access Services
    Hardhat Node: http://localhost:8545

    API Docs: http://localhost:8081/api-docs

    Health Check: http://localhost:8081/health

# Project Structure

        my-token-test/
    ├── api/               # API server code
    │   └── controllers.  
    │       └── balanceController.js
    │   └──  index.js
    ├── contracts/         # Solidity contracts
    ├── config/            #Swagger docconfig
    ├── scripts/           # Deployment scripts
    ├── docker-compose.yml # Docker configuration
    ├── Dockerfile         # Container build instructions
    └── hardhat.config.js  # Hardhat configuration

### Troubleshooting
## Manual Setup Issues
    Contracts not compiling: Run npx hardhat clean && npx hardhat compile
    
    Port conflicts: Change ports in api/index.js and hardhat.config.js
## Docker Issues
    Build failures: Run docker-compose build --no-cache
    
    Container not starting: Check logs with docker-compose logs
    
    Missing files: Verify all files exist in correct directories
