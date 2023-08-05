import { expect } from "chai";
import { ethers } from "hardhat";
import { encodeBytes32String } from "ethers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS  = ["P1", "P2", "P3"];

async function deployContract() {
      // get the contact 
    const contractFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await contractFactory.deploy(
      PROPOSALS .map(ethers.encodeBytes32String)
      );
    await ballotContract.waitForDeployment();
    //get the accounts from ether the 0 its the one that deployed
    const accounts = await ethers.getSigners();
    return { ballotContract, accounts}
};


describe("When the contract is deployed", async () => {
  

    it("Sets deployer address as chairperson", async () => {
        const { ballotContract, accounts } = await loadFixture(deployContract);
        const signer = accounts[0].address;
        // get an attribute from the blockchain
        const chairperson = await ballotContract.chairperson();
        expect(chairperson).to.eq(signer)
    });

    it("The proposals are the provided", async () => {
        const { ballotContract, accounts } = await loadFixture(deployContract);
        for (let index = 0; index < PROPOSALS .length; index++) {
            // get an attribute (array) from the blockchain
            const proposal = await ballotContract.proposals(index);
            // convert bytes32 to string and compare to the initial input
            expect(ethers.decodeBytes32String(proposal.name)).to.eq(PROPOSALS[index])
        }
    });

    it("Has all the proposals with 0 votes", async () => {
        const { ballotContract, accounts } = await loadFixture(deployContract);
        const deployerAddress = accounts[0].address;
        for (let index = 0; index < PROPOSALS.length; index++) {
            const proposal = await ballotContract.proposals(index);
            expect(0).to.eq(proposal.voteCount);
        }
    });
    
  });

