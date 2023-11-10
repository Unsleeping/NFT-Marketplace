import { ethers } from "hardhat";

const main = async () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.001");

  const overrides = {
    gasPrice: ethers.utils.parseUnits("1", "gwei"),
  };

  const lockFactory = await ethers.getContractFactory("Lock");
  const lock = await lockFactory.deploy(unlockTime, overrides);

  await lock.deployed();

  const formattedLockedAmount = ethers.utils.formatEther(lockedAmount);

  console.log(
    `Lock with ${formattedLockedAmount} ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
