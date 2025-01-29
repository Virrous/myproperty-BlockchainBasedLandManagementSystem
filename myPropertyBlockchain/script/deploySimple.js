const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SimpleStorage contract...");

  const SimpleStorage =  await ethers.getContractFactory("SimpleStorage");
  const simpleStorage =   SimpleStorage.deploy();
    // await simpleStorage.deploy();
  console.log("Contract details:", simpleStorage);
//   await simpleStorage.deployed();

  console.log("SimpleStorage deployed to:", simpleStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("An error occurred during deployment:", error);
    process.exit(1);
  });
