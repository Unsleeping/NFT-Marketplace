import { ethers } from "hardhat";
import { expect } from "chai";

describe("Lock Contract", () => {
  it("Should deploy Lock contract and retrieve unlock time", async () => {
    // Deploy Lock contract
    const Lock = await ethers.getContractFactory("Lock");
    const unlockTime = Math.round(Date.now() / 1000) + 60; // Set unlock time 60 seconds from now
    const lock = await Lock.deploy(unlockTime);

    await lock.deployed();

    // Retrieve unlock time from the deployed contract
    const retrievedUnlockTime = await lock.unlockTime();

    // Verify that the unlock time matches the expected value
    expect(retrievedUnlockTime).to.equal(unlockTime);
  });
});
