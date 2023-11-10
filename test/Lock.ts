import { ethers } from "hardhat";
import { expect } from "chai";

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime =
      (await ethers.provider.getBlock("latest")).timestamp + ONE_YEAR_IN_SECS;

    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await deployOneYearLockFixture();

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await deployOneYearLockFixture();

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await deployOneYearLockFixture();

      expect(await ethers.provider.getBalance(lock.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      const latestTime = (await ethers.provider.getBlock("latest")).timestamp;
      const Lock = await ethers.getContractFactory("Lock");
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await deployOneYearLockFixture();

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } =
          await deployOneYearLockFixture();

        await ethers.provider.send("evm_increaseTime", [unlockTime]);
        await ethers.provider.send("evm_mine", []);

        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await deployOneYearLockFixture();

        await ethers.provider.send("evm_increaseTime", [unlockTime]);
        await ethers.provider.send("evm_mine", []);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });
  });
});
