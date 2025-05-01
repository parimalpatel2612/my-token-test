#!/bin/sh
echo "Starting Hardhat node..."
npx hardhat node --hostname 0.0.0.0 > /dev/null &

echo "Waiting for Hardhat node to start..."
wait-port 8545

echo "Deploying contracts..."
npx hardhat run scripts/deploy.js --network localhost

echo "Starting API server..."
node api/index.js