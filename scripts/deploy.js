const hre = require("hardhat");

async function main() {

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  const initialSupply = hre.ethers.parseEther("1000000"); // Updated syntax

  const myToken = await MyToken.deploy(initialSupply);
  
  await myToken.waitForDeployment();
  
  const tokenAddress = await myToken.getAddress();
  
  console.log("Token deployed to:", tokenAddress);
  console.log("Token name:", await myToken.name());
  console.log("Token symbol:", await myToken.symbol());
  
  const deployerBalance = await myToken.balanceOf(deployer.address);
  console.log("Deployer token balance:", hre.ethers.formatEther(deployerBalance), "MTK");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  