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
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
