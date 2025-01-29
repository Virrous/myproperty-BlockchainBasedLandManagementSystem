const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  // const landRegistry = await ethers.getContractFactory("LandRegistry");
  const LandRegistry = await ethers.getContractFactory("Registry");
  const landRegistry = await LandRegistry.deploy();  
  // await landRegistry.deploy();  
  // await LandRegistry.deploy({
  //   gasLimit: 3000000  
  // });
  // // console.log("Contract details:", landRegistry);


  
  const address = landRegistry.address;
  if (address) {
    console.log("LandRegistry deployed to:", address);
  } else {
    console.log(" LandRegistry contract deployed sucessfully.");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("An error occurred during deployment:", error);
    process.exit(1);
  });
