const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LandRegistry Contract", function () {
  let LandRegistry;
  let landRegistry;
  let owner;

  beforeEach(async function () {
    LandRegistry = await ethers.getContractFactory("LandRegistry");
    landRegistry = await LandRegistry.deploy(); 

    [owner] = await ethers.getSigners();
  });

  it("Should create a land record", async function () {
    await landRegistry.createLandRecord(
      "LN123",
      "Downtown",
      500,
      "Residential",
      "Alice Johnson",
      "CTZ001234"
    );

    const landRecord = await landRegistry.getLandRecord(1);
    expect(landRecord.landId).to.equal(1);
    expect(landRecord.landNumber).to.equal("LN123");
    expect(landRecord.landmark).to.equal("Downtown");
    expect(landRecord.area).to.equal(500);
    expect(landRecord.landType).to.equal("Residential");
    expect(landRecord.ownerName).to.equal("Alice Johnson");
    expect(landRecord.citizenshipNo).to.equal("CTZ001234");
  });

  it("Should emit a LandRecordCreated event", async function () {
    await expect(
      landRegistry.createLandRecord(
        "LN456",
        "Uptown",
        750,
        "Commercial",
        "Bob Smith",
        "CTZ004567"
      )
    )
      .to.emit(landRegistry, "LandRecordCreated")
      .withArgs(1, "LN456", "Bob Smith", "CTZ004567");
  });
});
