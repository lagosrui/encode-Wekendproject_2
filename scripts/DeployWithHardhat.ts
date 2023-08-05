import { Wallet } from "ethers";
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

    
    console.log('Contract finally deployed');
    console.log('Rigth now lets use the contract');
    console.log('----------------------------------------------------------------------------------------');
    console.log('----------------------------------------------------------------------------------------');
    console.log('EXECUTING : GIVE RIGHTS TO OTHER ADRESS');
    
      //i am using ether to give me the secound adrees to use 
      const accounts = await ethers.getSigners();
      const voter = accounts[1].address;

      //then use the wallet to pass as string, executing the function giveRigthToVote
      const passouVotes = await ballotContract.giveRightToVote(voter);
      await passouVotes.wait();
      console.log(`Voting right given to ${voter}`);
   

    console.log('----------------------------------------------------------------------------------------');
    console.log('----------------------------------------------------------------------------------------');
    console.log('EXECUTING : Cast Vote');

    
      // give a random number to vote on that proposal 
        const proposalIndex: number = Math.floor(Math.random() * 3); 
        const votedIndex = await ballotContract.vote(proposalIndex);
        await votedIndex.wait();
        console.log(`Vote casted for proposal ${proposalIndex}`);
     
    //console.log('----------------------------------------------------------------------------------------');
    //console.log('----------------------------------------------------------------------------------------');
    //console.log('EXECUTING : Delegate Vote');

    
       // const delegateVote = await ballotContract.delegate(voter);
       // await delegateVote.wait();
       // console.log(`Vote delegated to ${voter}`);
      
    console.log('----------------------------------------------------------------------------------------');
    console.log('----------------------------------------------------------------------------------------');
    console.log('EXECUTING : QUERY');

  
        const winningProposal = await ballotContract.winningProposal();
        console.log(`Winning proposal index: ${winningProposal}`);
 

    

        const winnerName = await ballotContract.winnerName();
        console.log(`Winner name: ${ethers.decodeBytes32String(winnerName)}`);
        //console.log(`Winner name: ${ethers.utils.parseBytes32String(winnerName)}`);

    




    
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
