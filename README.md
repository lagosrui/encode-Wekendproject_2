Functions Ballot.sol report:

giveRightToVote(address voter): Allows the chairperson to give voting rights to an address. Requires that the address has not voted before and has a weight of 0.

delegate(address to): Allows a voter to delegate their vote to another address. Handles potential delegation loops and checks the weight of the delegate.

vote(uint proposal): Allows a voter to cast their vote for a proposal. Validates the voter's rights and the validity of the proposal.

winningProposal(): A view function that computes and returns the index of the winning proposal based on vote counts.

winnerName(): A view function that returns the name of the winning proposal.



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
