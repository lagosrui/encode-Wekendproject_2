import { ethers } from "hardhat";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  //it will give me the argument without the first 2 paths
  const proposals = process.argv.slice(2);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  // We first get the contract/deploy
  const contractFactory = await ethers.getContractFactory("Ballot");
    const ballotContract = await contractFactory.deploy(
      proposals.map(ethers.encodeBytes32String)
      );
    await ballotContract.waitForDeployment();


      //see the contract adress that we deplloyed
      const address = await ballotContract.getAddress();
      console.log(`Contract deployed to the address ${address}`);



    // how we get to know the proposal after
    for (let index = 0; index < PROPOSALS .length; index++) {
      // get an attribute (array) from the blockchain
      const proposal = await ballotContract.proposals(index);
      // convert bytes32 to string and compare to the initial input
      const name = ethers.decodeBytes32String(proposal.name);
      console.log({index, name, proposal});
      
    };
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});