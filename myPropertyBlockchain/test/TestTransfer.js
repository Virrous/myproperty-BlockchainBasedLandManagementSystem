const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TransferOwner Contract", function () {
  let TransferOwner, transferOwner, owner, addr1;

  beforeEach(async function () {
    TransferOwner = await ethers.getContractFactory("TransferOwner");
    [owner, addr1] = await ethers.getSigners();
    transferOwner =TransferOwner.deploy();
    // await transferOwner.deployed(); // Ensure the contract is deployed
  });

  it("Should add a new land record", async function () {
    await transferOwner.addLandRecord(
      1,
      "Location 1",
      1000,
      "Residential",
      "12345",
      "TC12345"
    );

    const landDetails = await transferOwner.getLandDetails(1);
    expect(landDetails.location).to.equal("Location 1");
    expect(landDetails.area).to.equal(1000);
    expect(landDetails.landType).to.equal("Residential");
    expect(landDetails.currentOwner).to.equal(owner.address);
  });

  it("Should allow the owner to transfer the land", async function () {
    await transferOwner.addLandRecord(
      1,
      "Location 1",
      1000,
      "Residential",
      "12345",
      "TC12345"
    );

    await transferOwner.transferProperty(
      1,
      "New Owner",
      "67890",
      "New Address",
      "TC67890"
    );

    const landDetails = await transferOwner.getLandDetails(1);
    expect(landDetails.currentOwner).to.equal(owner.address); // Owner has transferred property
  });

  it("Should prevent non-owners from transferring the land", async function () {
    await transferOwner.addLandRecord(
      1,
      "Location 1",
      1000,
      "Residential",
      "12345",
      "TC12345"
    );

    await expect(
      transferOwner.connect(addr1).transferProperty(
        1,
        "New Owner",
        "67890",
        "New Address",
        "TC67890"
      )
    ).to.be.revertedWith("You are not the owner");
  });
});
