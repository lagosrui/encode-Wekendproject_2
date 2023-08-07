#Function Ballot Report

<p>Functions Ballot.sol report:</p>

<p>giveRightToVote(address voter): Allows the chairperson to give voting rights to an address. Requires that the address has not voted before and has a weight of 0.</p>

<p>delegate(address to): Allows a voter to delegate their vote to another address. Handles potential delegation loops and checks the weight of the delegate.</p>

<p>vote(uint proposal): Allows a voter to cast their vote for a proposal. Validates the voter's rights and the validity of the proposal.</p>

<p>winningProposal(): A view function that computes and returns the index of the winning proposal based on vote counts.</p>

<p>winnerName(): A view function that returns the name of the winning proposal.</p>



```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
#   e n c o d e - W e k e n d p r o j e c t _ 2 
 
 
