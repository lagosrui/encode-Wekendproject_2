import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

//set up the enviroment to give the network to use ethers
function setupProvider() {
  const provider = new ethers.JsonRpcProvider( process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
};

async function main() {
  //it will give me the argument without the first 2 paths
  const proposals = process.argv.slice(2);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  // need the  provider (first)
  const provider = setupProvider();
  // using ether being able to see the block
  //const lastBlock = await provider.getBlock('latest');
  //console.log({lastBlock});

  //need to create a wallet (second)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  // We first get the contract/deploy ETHERS
  const contractFactory = new Ballot__factory(wallet);
  
    const ballotContract = await contractFactory.deploy(
      proposals.map(ethers.encodeBytes32String)
      );
    await ballotContract.waitForDeployment();


      //see the contract adress that we deplloyed
      const address = await ballotContract.getAddress();
      console.log(`Contract deployed to the address ${address}`);



    // how we get to know the proposal after
    for (let index = 0; index < proposals .length; index++) {
      // get an attribute (array) from the blockchain
      const proposal = await ballotContract.proposals(index);
      // convert bytes32 to string and compare to the initial input
      const name = ethers.decodeBytes32String(proposal.name);
      console.log({index, name, proposal});
      
    };

    const balanceBigNumber = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBigNumber));
    console.log(`Your Balance: ${balance}`);
    
    if (balance < 0.01) {
      console.log('you have eaven less that 0.1 ether , ask for more bro');
      
    }
    
    console.log('Contract finally deployed');
    console.log('Rigth now lets use the contract');
    console.log('----------------------------------------------------------------------------------------');
    console.log('----------------------------------------------------------------------------------------');
    console.log('EXECUTING : GIVE RIGHTS TO OTHER ADRESS');

    // Give votes to other adress
      
        //hardcode an wallet to pass as string, executing the function giveRigthToVote
        const voter = "0xA055dEc35EC8E5b8ED1DBF7cE85b2f5c809D2Aa6"
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
